const handler = async (conn, m) => {

  const start = Date.now()
  const end = Date.now()
  const speed = end - start

  await conn.sendMessage(m.chat, {
    text: `
Ping Pong

⚡ Speed : ${speed} ms`
  }, {
    quoted: m
  })
}

handler.command = ['ping']
handler.help = ['ping']
handler.tag = ['info']

export default handler
