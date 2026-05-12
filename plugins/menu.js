let handler = async (conn, m, { prefix }) => {
  const runtime = (seconds) => {
    seconds = Number(seconds)

    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor(seconds % (3600 * 24) / 3600)
    const mnt = Math.floor(seconds % 3600 / 60)
    const s = Math.floor(seconds % 60)

    return [
      d ? `${d} Hari` : '',
      h ? `${h} Jam` : '',
      mnt ? `${mnt} Menit` : '',
      s ? `${s} Detik` : ''
    ].filter(Boolean).join(' ')
  }

  const date = new Date()

  const tanggal = date.toLocaleDateString(
    'id-ID',
    {
      timeZone: 'Asia/Jakarta',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  )

  const waktu = date.toLocaleTimeString(
    'id-ID',
    {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
  )

  const text = `
𝙒𝙚𝙡𝗰𝗼𝗺𝗲 𝘁𝗼 ${global.nameBot}

❑ ᴜsᴇʀɴᴀᴍᴇ : ${m.pushName || 'User'}
❑ ᴅᴇᴠᴇʟᴏᴘᴇʀ : ${global.dev}
❑ ᴏᴡɴᴇʀ : ${global.ownerName}
❑ ᴘʀᴇғɪx : ${global.prefix}
❑ ᴠᴇʀsɪᴏɴ : ${global.version}

➥ ᴅᴀᴛᴇ : ${tanggal}
➥ ᴛɪᴍᴇ : ${waktu} WIB
➥ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}

ᴘʟᴇᴀsᴇ sᴇʟᴇᴄᴛ ᴛʜᴇ ᴍᴇɴᴜ ʙᴇʟᴏᴡ.`
  await conn.sendMessage(
    m.chat,
    {
      image: {
        url: global.thumb
      },
      caption: text,
      footer: `© ${global.nameBot}`,
      buttons: [
        {
          text: 'Contact Owner',
          id: `${prefix}owner`
        },

        {
          text: 'Developer',
          id: `${prefix}dev`
        },
        {
          text: 'List Menu',
          sections: [
            {
              title: '✨ Main Menu',
              rows: [
                {
                  header: 'All Menu (Ketik manual .allmenu)',
                  title: '📋 All Menu',
                  description: 'Menampilkan semua fitur bot',
                  id: `${prefix}allmenu`
                }
              ]
            },
            {
              title: '📥 Downloader',
              rows: [
                {
                  title: 'TikTok Download',
                  description: 'Download video TikTok tanpa watermark',
                  id: `${prefix}tt`
                },

                {
                  title: 'Mediafire Download',
                  description: 'Download file dari MediaFire',
                  id: `${prefix}mf`
                }
              ]
            },
            {
              title: '🧠 Menu AI',
              rows: [
                {
                  title: 'Gpt 5 Nano',
                  description: 'Chat dengan ai model gpt 5 nano',
                  id: `${prefix}gpt`
                },
                {
                  title: 'Claude 3 Haiku',
                  description: 'Chat dengan ai model claude 3 haikku',
                  id: `${prefix}claude`
                },
                {
                  title: 'Qwen TTS',
                  description: 'Generate suara ai dari berbagai model',
                  id: `${prefix}qwen-tts`
                }
              ]
            },
            {
              title: "🔍 Search Menu",
              rows: [
                {
                  title: 'Wikipedia',
                  description: 'Mencari informasi diwikipedia',
                  id: `${prefix}wiki`
                },
                {
                  title: 'Movie',
                  description: 'Cari movie di imdb',
                  id: `${prefix}movie`
                }
              ]
            },
            {
              title: '⚙️ Owner Menu',
              rows: [
                {
                  title: 'List Plugin',
                  description: 'Melihat semua daftar plugin',
                  id: `${prefix}listplugin`
                },
                {
                  title: 'Create Plugin',
                  description: 'Membuat plugin baru',
                  id: `${prefix}plugin`
                },
                {
                  title: 'Get Plugin',
                  description: 'Ambil isi plugin dalam bentuk file .js',
                  id: `${prefix}getplugin`
                },
                {
                  title: 'Delete Plugin',
                  description: 'Menghapus plugins tertentu',
                  id: `${prefix}delplugin`
                }
              ]
            }
          ]
        }
      ]
    },
    { quoted: m })
  }

handler.command = ['menu']
handler.help = ['menu']
handler.tag = ['main']

export default handler