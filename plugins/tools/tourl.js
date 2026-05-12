import axios from 'axios'
import FormData from 'form-data'
import { downloadContentFromMessage } from '@dnuzi/baileys'

// UPLOAD CDN NEKOHIME
async function uploadNekohime(buffer) {
  try {
    const form = new FormData()
    form.append('file', buffer, 'image.jpg')

    const { data } = await axios.post('https://cdn.nekohime.site/upload', form, {
        headers: {
          ...form.getHeaders()
        },
        timeout: 60000
      })

    const url = data?.result?.url || data?.files?.[0]?.url

    if (!url) {
      throw new Error('Gagal Upload CDN')}

    return url
  } catch (e) {
    console.log(e)

    throw new Error(e?.response?.data?.message ||
      e.message)}
}

async function getBuffer(message, type) {
  const stream = await downloadContentFromMessage(message, type)

  let buffer = Buffer.from([])
  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
  }
  return buffer
}

let handler = async (conn,m,{command,prefix}) => {
  try {
    const q = m.quoted || m
    const imageMessage = q?.msg || q?.message?.imageMessage || q?.quoted?.message?.imageMessage
    const mime = imageMessage?.mimetype || ''
    const isImage = /image/.test(mime)

    if (!isImage) {
      return await conn.sendMessage(m.chat, {
          text:
`*Contoh Penggunaan*

Reply/Kirim gambar dengan caption:
${prefix + command}`
        },
        { quoted: m }
      )}

    await conn.sendMessage(m.chat, {
        text:'⏳ Uploading image to CDN...'
      },
      { quoted: m })

  const media = await getBuffer(imageMessage, 'image')
    if (!media) {
      throw new Error('Failed download image.')
    }
    const url = await uploadNekohime(media)
    await conn.sendMessage(m.chat, {
    text:`
╭━━━〔 *TOURL UPLOADER* 〕━━━⬣
┃
┃ ✅ *Upload Berhasil*
┃
┣━⬣ *File URL*
┃ ${url}
┃
┣━⬣ *Uploader*
┃ Nekohime CDN
┃
╰━━━━━━━━━━━━━━━━⬣`,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363424411396051@newsletter',
        newsletterName: 'Tourl Uploader — Nekohime',
        serverMessageId: 1
      }
    }
  },
  { quoted: m })
  } catch (e) {
    console.log(e)
    await conn.sendMessage(m.chat, {
        text:
`❌ *Upload Failed*

📌 *Details :*
${e.message}`
      },
      { quoted: m })
  }
}

handler.command = ['tourl']
handler.help = ['tourl']
handler.tag = ['tools']

export default handler