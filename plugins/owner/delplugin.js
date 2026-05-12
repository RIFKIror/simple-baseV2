import fs from 'fs'

const handler = async (conn, m, {
  args,
  command,
  prefix
}) => {

  try {

    // OWNER ONLY
    if (!global.owner.includes(m.number)) {

      return await conn.sendMessage(
        m.chat,
        {
          text: '❌ Owner only command.'
        },
        {
          quoted: m
        }
      )

    }

    const filepath = args[0]

    // VALIDATION
    if (!filepath) {

      return await conn.sendMessage(
        m.chat,
        {
          text:
`📌 *Example Usage*

${prefix + command} ./plugins/test.js`
        },
        {
          quoted: m
        }
      )

    }

    // ONLY JS FILE
    if (!filepath.endsWith('.js')) {

      return await conn.sendMessage(
        m.chat,
        {
          text: '❌ Only *.js* plugin files can be deleted.'
        },
        {
          quoted: m
        }
      )

    }

    // FILE EXISTS
    if (!fs.existsSync(filepath)) {

      return await conn.sendMessage(
        m.chat,
        {
          text: '❌ Plugin file not found.'
        },
        {
          quoted: m
        }
      )

    }

    // FILE INFO
    const stats = fs.statSync(filepath)

    const formatSize = (bytes) => {

      if (bytes < 1024) {

        return `${bytes} B`

      }

      else if (bytes < 1024 * 1024) {

        return `${(
          bytes / 1024
        ).toFixed(2)} KB`

      }

      else {

        return `${(
          bytes / 1024 / 1024
        ).toFixed(2)} MB`

      }

    }

    fs.unlinkSync(filepath)

    delete global.plugins[
      filepath
    ]

    // SUCCESS MESSAGE
    await conn.sendMessage(
      m.chat,
      {
        text:
`✅ *Plugin Successfully Deleted*

📂 *Path :*
${filepath}

📄 *Size :*
${formatSize(stats.size)}

🗑️ *Status :*
Plugin removed from system successfully.`
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
`❌ *Error Delete Plugin*

📌 *Details :*
${e}

⚠️ Failed to remove plugin from system.`
      },
      {
        quoted: m
      }
    )

  }

}

handler.command = ['delplugin', 'dp']
handler.help = ['delplugin <path>']
handler.tag = ['owner']

export default handler
