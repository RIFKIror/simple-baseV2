import fs from 'fs'
import path from 'path'

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

    if (!filepath) {

      return await conn.sendMessage(
        m.chat,
        {
          text:
`📌 Example :

${prefix + command} ./plugins/menu.js`
        },
        {
          quoted: m
        }
      )
    }

    // VALIDATE FILE
    if (!fs.existsSync(filepath)) {

      return await conn.sendMessage(
        m.chat,
        {
          text: '❌ File not found.'
        },
        {
          quoted: m
        }
      )
    }

    // VALIDATE JS FILE
    if (!filepath.endsWith('.js')) {

      return await conn.sendMessage(
        m.chat,
        {
          text: '❌ Only .js plugin files are allowed.'
        },
        {
          quoted: m
        }
      )
    }

    const stats = fs.statSync(filepath)

    const formatSize = (bytes) => {

      if (bytes < 1024) {
        return `${bytes} B`
      }

      else if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`
      }

      else {
        return `${(bytes / 1024 / 1024).toFixed(2)} MB`
      }

    }

    // SEND DOCUMENT
    await conn.sendMessage(
      m.chat,
      {
        document: fs.readFileSync(filepath),

        mimetype: 'application/javascript',

        fileName: path.basename(filepath),

        caption:
`📂 Plugin File

❑ Name : ${path.basename(filepath)}
❑ Size : ${formatSize(stats.size)}
❑ Path : ${filepath}`
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
        text: `Error:\n${e}`
      },
      {
        quoted: m
      }
    )

  }

}

handler.command = ['getplugin']
handler.help = ['getplugin <path>']
handler.tag = ['owner']

export default handler
