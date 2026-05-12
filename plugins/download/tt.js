import axios from 'axios'
const handler = async (
  conn,
  m,
  {
    args,
    command,
    prefix
  }
) => {
  try {
    const url = args[0]
    if (!url) {
      return await conn.sendMessage(
        m.chat,
        {
          text:
`📌 *Example Usage*

${prefix + command} https://vt.tiktok.com/...`
        },
        {
          quoted: m
        }
      )
    }

    if (!url.includes('tiktok.com') && !url.includes('vt.tiktok.com')
    ) {
      return await conn.sendMessage(
        m.chat,
        {
          text: '❌ Invalid TikTok URL.'
        },
        {
          quoted: m
        }
      )
    }
    await conn.sendMessage(
      m.chat,
      {
        text: '⏳ Tunggu sebentar...'
      },
      {
        quoted: m
      }
    )

    const { data } = await axios.get(`https://api.lexcode.biz.id/api/dwn/tiktok?url=${encodeURIComponent(url)}`
    )
    if (!data.success) {
      throw new Error('Failed fetch TikTok data.'
      )
    }
    const result = data.result
    const username = result.username || 'Unknown'
    const duration = result.duration || 'Unknown'
    const stats = result.stats || {}
    const video = result.video?.[0]
    const audio = result.audio?.[0]

    if (!video) {
      throw new Error('Video download unavailable.'
      )

    }

    // CAPTION
    const caption = `
*TikTok Downloader*

👤 *Username :* ${username}
⏱️ *Duration :* ${duration}

📊 *Statistics :*
• 👁️ Views : ${stats.views || 0}
• ❤️ Likes : ${stats.likes || 0}
• 💬 Comments : ${stats.comments || 0}
• 📤 Shares : ${stats.shares || 0}

🔗 *Source :*
${url}
`
    await conn.sendMessage(
      m.chat,
      {
        video: {
          url: video
        },
        caption,
        mimetype: 'video/mp4',
        contextInfo: {
          externalAdReply: {
            title: username,
            body: 'TikTok Downloader',
            sourceUrl: url,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      {
        quoted: m
      }
    )
    if (audio) {
      await conn.sendMessage(
        m.chat,
        {
          audio: {
            url: audio
          },
          mimetype: 'audio/mpeg',
          ptt: false,
          fileName: `${username}.mp3`
        },
        {
          quoted: m
        }
      )
    }
  } catch (e) {
    console.log(e)
    await conn.sendMessage(
      m.chat,
      {
        text:
`❌ *TikTok Download Error*

📌 *Details :*
${e.message}`
      },
      {
        quoted: m
      }
    )
  }
}
handler.command = ['tt']
handler.help = ['tt <url>']
handler.tag = ['download']

export default handler