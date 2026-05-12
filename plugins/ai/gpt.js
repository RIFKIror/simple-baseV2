import axios from 'axios'

let handler = async (conn,m,{text,command,prefix}) => {
  try {
    if (!text) {
      return await conn.sendMessage(m.chat, {
          text: `❌ *Contoh Penggunaan*:\n${prefix + command} halo`
        },
        { quoted: m })
      }

    const { data } = await axios.get(`https://api.lexcode.biz.id/api/ai/gpt5-nano?text=${encodeURIComponent(text)}`)

    if (!data?.success || !data?.result?.success) {
      throw new Error(
        'Failed get AI response.'
      )}

    const result = data.result.result
        ?.replace(/\*\*/g, '')
        ?.trim()
    const responseTime = data.result.responseTime || 'Unknown'
    const timestamp = data.result.timestamp ||
      '-'

    const response =`
*𝙂𝙥𝙩 5 𝙉𝙖𝙣𝙤*

➥ ${result}

☁️ *ʀᴇsᴘᴏɴsᴇ*: ${responseTime}
⏳ *ᴛɪᴍᴇsᴛᴀᴍᴘ*: ${timestamp}`
    await conn.sendMessage(
      m.chat,
      {
        text: response,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363424411396051@newsletter',
            newsletterName: 'Gpt 5 Nano',
            serverMessageId: 1
          }
        }
      },
      { quoted: m })
  } catch (e) {
    console.log(e)
    await conn.sendMessage(m.chat,{
        text: `❌ *Error* : ${e.message}`
      },
      { quoted: m })
   }
}

handler.command = ['gpt']
handler.help = ['gpt <text>']
handler.tag = ['ai']

export default handler