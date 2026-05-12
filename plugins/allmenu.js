let handler = async (conn, m) => {
  const text = `
*${global.nameBot} — All Menu*

Selamat datang di bot ${global.nameBot}.
Berikut daftar fitur yang tersedia dan dapat digunakan.

━━━━━━━━━━━━━━━
*MENU DOWNLOADER*

• .mf <link_mediafire>
• .tt <link_tiktok>

━━━━━━━━━━━━━━━
*MENU AI*

• .gpt <text>
• .claude <text>
• .qwen-tts <text> <model>

━━━━━━━━━━━━━━━
*MENU SEARCH*

• .wiki <query>
• .movie <query>

━━━━━━━━━━━━━━━
*MENU TOOLS*

• .tourl <reply gambar>

━━━━━━━━━━━━━━━
*MENU STALKER*

• .ghstalk <username>

━━━━━━━━━━━━━━━
*MENU OWNER*

• .plugin <reply code> <path>
• .listplugin
• .delplugin <path>
• .getplugin <path>

━━━━━━━━━━━━━━━
© ${global.nameBot}`.trim()
  await conn.sendMessage(m.chat,
    {
      image: {
        url: global.thumb
      },
      caption: text,
      footer: global.nameBot,
      buttons: [
        {
          buttonId: '.owner',
          buttonText: {
            displayText: 'Contact Owner'
          },
          type: 1
        },

        {
          buttonId: '.dev',
          buttonText: {
            displayText: 'Developer'
          },
          type: 1
        },

        {
          buttonId: '.info',
          buttonText: {
            displayText: 'Informasi Bot'
          },
          type: 1
        }
      ],
      headerType: 4,
      contextInfo: {
        forwardingScore: 999999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: global.nameBot,
          newsletterJid:
            '120363420019948650@newsletter'
        }
      }

    },
    { quoted: m }
  )
}

handler.command = ['allmenu']
handler.help = ['allmenu']
handler.tag = ['main']

export default handler