let handler = async (conn, m) => {

  const text = `
*Hello, ${m.pushName || 'User'} 👋*

Terima kasih telah menggunakan base bot ini.
Berikut informasi developer, website, dan project 

━━━━━━━━━━━━━━━
*INFORMASI DEVELOPER*

• *Nama :* ${global.dev || 'KyynXzz'}
• *TikTok :* @xyyzn_505
• *Telegram :* @kyynxz31
• *WhatsApp :* 6281239075413
• *GitHub :* github.com/RIFKIror
• *Channel* : https://whatsapp.com/channel/0029VbC2uly2f3EEsyAGna1d
━━━━━━━━━━━━━━━
*INFORMASI WEBSITE*

• *Website :* kyynns.vercel.app
• *Rest API :* api.lexcode.biz.id
• *Snippet :* www.lexcode.my.id
━━━━━━━━━━━━━━━
*INFORMASI PROJECT*

• *Base V1 :*
github.com/RIFKIror/Simple-Base-Bot-WhatsApp

• *Base Telegram :*
github.com/RIFKIror/LexBot-Tele

• *Snippet Source :*
github.com/RIFKIror/LexCode-Simple-Snippet
━━━━━━━━━━━━━━━
© ${global.nameBot}`.trim()
  await conn.sendMessage(
    m.chat,
    {
      text,
      contextInfo: {
        forwardingScore: 999999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: 'Developer Information',
          newsletterJid:
            '120363420019948650@newsletter'
        }
      }
    },
    { quoted: m }
  )
}

handler.command = ['dev', 'developer']
handler.help = ['dev']
handler.tag = ['main']

export default handler