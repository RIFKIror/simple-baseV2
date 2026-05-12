import os from 'os'

let handler = async (conn, m) => {
  const runtime = (seconds) => {
    seconds = Number(seconds)
    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor(seconds % (3600 * 24) / 3600)
    const mnt = Math.floor(seconds % 3600 / 60)
    const s = Math.floor(seconds % 60)

    return [
      d ? `${d} Day` : '',
      h ? `${h} Hour` : '',
      mnt ? `${mnt} Minute` : '',
      s ? `${s} Second` : ''
    ].filter(Boolean).join(' ')
  }

  const formatBytes = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`
    }
    else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`
    }
    else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / 1024 / 1024).toFixed(2)} MB`
    }
    else {
      return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`
    }
  }

  const totalRam = os.totalmem()
  const freeRam = os.freemem()
  const usedRam = totalRam - freeRam
  const cpu = os.cpus()[0]
  const processMemory = process.memoryUsage()
  const date = new Date()

  const tanggal = date.toLocaleDateString('id-ID',
    {
      timeZone: 'Asia/Jakarta',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  )

  const waktu = date.toLocaleTimeString('id-ID',
    {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
  )

  const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      *BOT INFORMATION*

• *Bot Name :* ${global.nameBot}
• *Version :* ${global.version}
• *Prefix :* ${global.prefix}
• *Developer :* ${global.dev}
• *Owner :* ${global.ownerName}
• *User :* ${m.pushName || 'User'}

• *Runtime :* ${runtime(process.uptime())}
• *Date :* ${tanggal}
• *Time :* ${waktu} Wib
• *Platform :* ${os.platform()} ${os.arch()}
• *CPU Model* : ${cpu.model}
• *CPU Core :* ${os.cpus().length} Core
• *CPU Speed :* ${cpu.speed} MHz
• *Total RAM :* ${formatBytes(totalRam)}
• *Used RAM :* ${formatBytes(usedRam)}
• *Free RAM :* ${formatBytes(freeRam)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`.trim()
  await conn.sendMessage(m.chat,{
      text,
      contextInfo: {
        forwardingScore: 999999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: 'Bot Information',
          newsletterJid:
            '120363420019948650@newsletter'
        }
      }
    },
    { quoted: m })
}

handler.command = ['info']
handler.help = ['botinfo']
handler.tag = ['main']

export default handler