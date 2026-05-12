export const serialize = (sock, m) => {

  const rawChat = m.key.remoteJid || ''
  const rawSender = m.key.participant || m.key.remoteJid || ''
  const cleanJid = (jid = '') =>
    jid
      .replace(/:\d+/, '') // multi-device fix
      .toLowerCase()

  m.chat = cleanJid(rawChat)
  m.fromMe = m.key.fromMe
  m.isGroup = m.chat.endsWith('@g.us')
  m.sender = m.isGroup
    ? cleanJid(rawSender)
    : m.chat

  m.number = m.sender.split('@')[0]
  m.body =
    m.message?.conversation ||
    m.message?.extendedTextMessage?.text ||
    m.message?.imageMessage?.caption ||
    m.message?.videoMessage?.caption ||
    m.message?.buttonsResponseMessage?.selectedButtonId ||
    m.message?.templateButtonReplyMessage?.selectedId ||
    m.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
    m.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson ||
    ''

  // FIX native flow
  try {
    const flow = JSON.parse(
      m.message?.interactiveResponseMessage
        ?.nativeFlowResponseMessage?.paramsJson
    )

    if (flow?.id) {
      m.body = flow.id
    }
  } catch {}

  m.reply = async (text) => {
    return await sock.sendMessage(
      m.chat,
      { text },
      { quoted: m }
    )
  }

  return m
}
