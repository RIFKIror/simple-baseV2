let handler = async (conn, m) => {

  try {
    const number = global.owner[0]
      .replace(/[^0-9]/g, '')

    const vcard =
      'BEGIN:VCARD\n'
      + 'VERSION:3.0\n'
      + `FN:${global.ownerName}\n`
      + `ORG:${global.nameBot};\n`
      + `TEL;type=CELL;type=VOICE;waid=${number}:+${number}\n`
      + 'END:VCARD'

    await conn.sendMessage(m.chat, {
        contacts: {
          displayName: global.ownerName,
          contacts: [
            { vcard }
          ]
        }
      },
      { quoted: m })
  } catch (e) {
    console.log(e)
    await conn.sendMessage(m.chat, {
        text:
`❌ Failed send owner contact

${e.message}`
      },
      { quoted: m })
  }
}

handler.command = ['owner']
handler.help = ['owner']
handler.tag = ['main']

export default handler