import fs from 'fs'
import path from 'path'

export const loadPlugins = async () => {
  const plugins = []

  const files = fs.readdirSync('./plugins')

  for (const file of files) {
    if (!file.endsWith('.js')) continue

    const plugin = await import(`../plugins/${file}`)

    plugins.push(plugin.default)
  }

  return plugins
}
