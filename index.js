import './settings.js'
import {
  makeWASocket,
  makeInMemoryStore,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} from '@dnuzi/baileys'
import pino from 'pino'
import readline from 'readline'
import fs from 'fs'
import chalk from 'chalk'
import { Boom } from '@hapi/boom'
import { serialize } from './lib/serializer.js'
import { loadPlugins } from './lib/loader.js'
import handlerPlugins from './handler/plugins.js'

const logger = pino({ level: 'silent' })
const storePath = './store.json'

const question = (text) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(text, resolve)
  })
}

const connectToWhatsApp = async () => {
  const { state, saveCreds } = await useMultiFileAuthState(global.sessionName)

  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    logger,
    auth: state,
    printQRInTerminal: false,
    markOnlineOnConnect: true,
    syncFullHistory: false,
    browser: ['Ubuntu', 'Chrome', '20.0.04']
  })

  const store = makeInMemoryStore({ logger })
  store.readFromFile(storePath)
  store.bind(sock.ev)

  setInterval(() => {
    store.writeToFile(storePath)
  }, 180000)

  if (!sock.authState.creds.registered) {
    const phoneNumber = await question(
      chalk.green('Masukkan Nomor WhatsApp Awali 62 : ')
    )

    const pairingCode = global.customPairing
    const code = await sock.requestPairingCode(phoneNumber, pairingCode)
    console.log(chalk.yellow(`\nPairing Code : ${code}\n`))
  }

  sock.ev.on('creds.update', saveCreds)

  const plugins = await loadPlugins()

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]

    if (!msg.message) return
    if (msg.key && msg.key.remoteJid === 'status@broadcast') return

    const m = serialize(sock, msg)

    const body =
      m.body ||
      m.message?.conversation ||
      m.message?.extendedTextMessage?.text ||
      ''

    const prefix = global.prefix

    if (!body.startsWith(prefix)) return

    const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
    const args = body.trim().split(/ +/).slice(1)

  for (const name in global.plugins) {

  const plugin = global.plugins[name]

  if (!plugin.command) continue

  const isCommand = Array.isArray(plugin.command)

    ? plugin.command.some(cmd =>
        cmd instanceof RegExp
          ? cmd.test(command)
          : cmd === command
      )

    : plugin.command instanceof RegExp

      ? plugin.command.test(command)

      : plugin.command === command

  if (!isCommand) continue

  try {

    await plugin(sock, m, {
      conn: sock,
      args,
      command,
      prefix,
      text: args.join(' ')
    })

  } catch (e) {

    console.log(e)

    await sock.sendMessage(
      m.chat,
      {
        text: `Error Plugin:\n${e}`
      },
      {
        quoted: m
       }
     )
   }
  }
})

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update

    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode

      if (reason !== DisconnectReason.loggedOut) {
        console.log(chalk.red('Reconnect...'))
        connectToWhatsApp()
      }
    }

    if (connection === 'open') {
      console.log(chalk.green('Bot Connected'))
    }
  })
}

await handlerPlugins()
connectToWhatsApp()
