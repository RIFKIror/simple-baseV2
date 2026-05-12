import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const handler = async (conn, m, {
  args,
  text,
  command,
  prefix
}) => {

  try {
    if (!global.owner.includes(m.number)) {
      return await conn.sendMessage(
        m.chat,
        {
          text: '❌ Owner only command.'
        },
        {
          quoted: m
        }
      )
    }

    let code = ''
    let filepath = ''

const fullText = (m.body || '').trim()
const input = fullText.split(' ').slice(1).join(' ').trim()

const quoted =
  m.message?.extendedTextMessage?.contextInfo?.quotedMessage

const quotedText =
  quoted?.conversation ||
  quoted?.extendedTextMessage?.text ||
  quoted?.imageMessage?.caption ||
  quoted?.videoMessage?.caption ||
  ''

// DETECT MODE
if (quotedText) {

  // REPLY MODE
  code = quotedText
  filepath = input

} else {

  // DIRECT MODE (.plugin code | path)
  const split = input.split('|')

  code = split[0]?.trim()
  filepath = split[1]?.trim()

}

    // VALIDATION
    if (!code || !filepath) {

      return await conn.sendMessage(
        m.chat,
        {
          text:
`📌 Example Usage

➥ Direct Mode
${prefix + command} console.log("Hello World") | ./plugins/test.js

➥ Reply Mode
Reply code message then:

${prefix + command} ./plugins/test.js`
        },
        {
          quoted: m
        }
      )
    }

    // FILE EXTENSION
    if (!filepath.endsWith('.js')) {

      return await conn.sendMessage(
        m.chat,
        {
          text: '❌ File must end with .js'
        },
        {
          quoted: m
        }
      )
    }

    // AUTO CREATE DIRECTORY
    const dir = path.dirname(filepath)

    fs.mkdirSync(dir, {
      recursive: true
    })

    // WRITE FILE
    fs.writeFileSync(filepath, code)

    // AUTO IMPORT PLUGIN
    try {

      const fileUrl = pathToFileURL(
        path.resolve(filepath)
      ).href

      const imported = await import(
        `${fileUrl}?update=${Date.now()}`
      )

      global.plugins[filepath] =
        imported.default || imported

    } catch (e) {

      console.log(
        'Plugin loaded with warning:',
        e
      )

    }

    // SUCCESS MESSAGE
    await conn.sendMessage(
      m.chat,
      {
        text:
`✅ Plugin Successfully Created

📂 Path :
${filepath}

📄 Size :
${Buffer.byteLength(code, 'utf8')} Bytes

⚡ Status :
Plugin Loaded Successfully`
      },
      {
        quoted: m
      }
    )

  } catch (e) {

    console.log(e)

    await conn.sendMessage(
      m.chat,
      {
        text:
`❌ Error Creating Plugin

${e}`
      },
      {
        quoted: m
      }
    )

  }

}

handler.command = ['plugin']
handler.help = ['plugin']
handler.tag = ['owner']

export default handler
