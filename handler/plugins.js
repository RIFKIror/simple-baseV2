import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

global.plugins = {}

const handlerPlugins = async (dir = './plugins') => {

  const files = fs.readdirSync(dir)

  for (const file of files) {

    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    // FOLDER
    if (stat.isDirectory()) {
      await handlerPlugins(fullPath)
    }

    // FILE JS
    else if (file.endsWith('.js')) {

      try {

        const fileUrl = pathToFileURL(
          path.resolve(fullPath)
        ).href

        const imported = await import(
          `${fileUrl}?update=${Date.now()}`
        )

        global.plugins[fullPath] =
          imported.default || imported

        console.log(
          `✅ Plugin Loaded : ${fullPath}`
        )

      } catch (e) {

        console.log(
          `❌ Error Plugin : ${fullPath}`
        )

        console.log(e)

      }
    }
  }
}

export default handlerPlugins
