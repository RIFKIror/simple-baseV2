import axios from 'axios'

const handler = async (conn,m,{text,command,prefix}) => {
  try {
    if (!text) {
      return await conn.sendMessage(m.chat, {
          text:
`✦ *Claude 3 Haiku AI*

📌 *Contoh Penggunaan :*
${prefix + command} Halo`
        },
        { quoted: m })
    }

    const { data } = await axios.get(`https://api.lexcode.biz.id/api/ai/claude-3-haiku?text=${encodeURIComponent(text)}`)

    if (!data?.success) {
      throw new Error('Failed get AI response.')}

    const result = data.result?.result || data.result || 'No response.'
    const timestamp = data.result?.timestamp ||
      new Date().toISOString()
    const responseTime = data.result?.responseTime ||
      'Unknown'

    const response =
`✦ 𝘾𝙡𝙖𝙪𝙙𝙚 3 𝙃𝙖𝙞𝙠𝙪

➥ ${result}

✦ *ʀᴇsᴘᴏɴsᴇ ᴛɪᴍᴇ* :
⏳ ${responseTime}

✦ *ᴛɪᴍᴇsᴛᴀᴍᴘ* :
🕒 ${timestamp}

> © ${global.nameBot}`
    await conn.sendMessage(m.chat, {
        text: response,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363424411396051@newsletter',
            newsletterName: 'Claude 3 Haiku',
            serverMessageId: 1
          }
        }
      },
      { quoted: m })
  } catch (e) {
    console.log(e)
    await conn.sendMessage(m.chat, {
        text:
`*Claude AI Error*

❌ ${e.message}`
      },
      { quoted: m })
  }
}

handler.command = ['claude']
handler.help = ['claude <text>']
handler.tag = ['ai']

export default handler