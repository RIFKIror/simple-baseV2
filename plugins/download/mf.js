import axios from 'axios'
const handler = async (
  conn,
  m,
  {
    args,
    command,
    prefix
  }) => {
  try {
    const url = args[0]
    if (!url) {
      return await conn.sendMessage(
        m.chat,
        {
          text:
`📌 *Contoh penggunaan*

${prefix + command} https://www.mediafire.com/file/...`
        },
        {
          quoted: m
        }
      )}
    if (!url.includes('mediafire.com')) {
      return await conn.sendMessage(
        m.chat,
        {
          text: '❌ Invalid MediaFire URL.'
        },
        {
          quoted: m
        }
      )
    }
    await conn.sendMessage(
      m.chat,
      {
        text: '⏳ Processing MediaFire download...'
      },
      {
        quoted: m
      }
    )
    const { data } = await axios.get(`https://api.lexcode.biz.id/api/dwn/mediafire?url=${encodeURIComponent(url)}`
    )
    if (!data.success) {
      throw new Error('Failed fetch MediaFire data.'
      )
    }
    const result = data.data
    if (!result.downloadUrl) {
      throw new Error('Download URL unavailable.'
      )
    }
    const caption = `
*MediaFire Downloader*

📄 *File Name :* ${result.name}
📦 *File Size :* ${result.size}
🧩 *File Type :* ${result.type}

📅 *Uploaded At :*
${result.uploadedAt}`
    await conn.sendMessage(
      m.chat,
      {
        document: {
          url: result.downloadUrl
        },
        mimetype: result.type || 'application/octet-stream',
        fileName: result.name,
        caption,
        contextInfo: {
          externalAdReply: {
            title: result.name,
            body: `${result.size} • MediaFire Downloader`,
            sourceUrl: url,
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
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
`❌ *MediaFire Download Error*

📌 *Details :*
${e.message}`
      },
      {
        quoted: m
      }
    )
  }
}
handler.command = ['mf']
handler.help = ['mf <url>']
handler.tag = ['download']

export default handler