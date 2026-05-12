import fs from 'fs'
import path from 'path'

const handler = async (conn, m) => {
  try {
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

    const plugins = Object.keys(global.plugins)

    if (!plugins.length) {

      return await conn.sendMessage(
        m.chat,
        {
          text: '❌ No plugins loaded.'
        },
        {
          quoted: m
        }
      )
    }

    let totalSize = 0

    const rendered = plugins.map((file, index) => {

      let size = 0

      try {

        size = fs.statSync(file).size
        totalSize += size

      } catch {}

      return `${index + 1}. ${file}`

    }).join('\n')

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

    const text = `
*ALL List Plugins*

❑ Total : ${plugins.length}
❑ Size  : ${formatSize(totalSize)}

*File Path Plugins*

${rendered}
`

    await conn.sendMessage(
      m.chat,
      {
        text
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

handler.command = ['listplugin']
handler.help = ['listplugin']
handler.tag = ['owner']

export default handler
