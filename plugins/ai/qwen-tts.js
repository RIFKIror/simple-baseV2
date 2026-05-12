import axios from 'axios'

const VOICES = [
  'dylan',
  'sunny',
  'jada',
  'cherry',
  'ethan',
  'serena',
  'chelsie'
]

let handler = async (conn,m,{args,command,prefix}) => {
  try {
    const text = args.slice(0, -1).join(' ')
    const voice = args[args.length - 1]?.toLowerCase()

    // VALIDATION
    if (!text || !voice) {
      return await conn.sendMessage(
        m.chat,
        {
          text: `
*Qwen TTS (Text To Speech)*

✦ *Voice Models Available*
➥ dylan
➥ sunny
➥ jada
➥ cherry
➥ ethan
➥ serena
➥ chelsie

✦ *How To Use*
${prefix + command} <text> <model>

✦ *Example*
${prefix + command} halo dylan`
        },
        { quoted: m })
    }
    if (!VOICES.includes(voice)) {
      return await conn.sendMessage(m.chat, {
          text:
`❌ Voice tidak valid.

*Gunakan Voice Berikut* :
${VOICES.map(v => `• ${v}`).join('\n')}`
        },
        { quoted: m }
      )
    }

    // LOADING
    await conn.sendMessage(
      m.chat,
      {
        text: '⏳ Generating voice...'
      },
      { quoted: m }
    )

    // API REQUEST
    const { data } = await axios.get(`https://api.lexcode.biz.id/api/ai/qwen-tts?text=${encodeURIComponent(text)}&voice=${voice}`,
      {
        timeout: 60000,
        headers: {
          Accept: 'application/json'
        }
      }
    )

    if (!data?.result) {
      throw new Error('Audio result not found.')
    }

    await conn.sendMessage(m.chat,{
        audio: {
          url: data.result
        },
        mimetype: 'audio/mpeg',
        ptt: false
      },
      { quoted: m })
  } catch (e) {
    console.log(e)
    await conn.sendMessage(m.chat, {
        text:
`❌ *Qwen TTS Error*

📌 *Details :*
${e?.response?.data?.message || e.message}`
      },
      { quoted: m })
  }
}

handler.command = ['qwen-tts', 'qwtts']
handler.help = ['qwen-tts <text> <voice>']
handler.tag = ['ai']

export default handler