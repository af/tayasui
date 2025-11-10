import fs from 'node:fs'
import { marked } from 'marked'

const renderer = {
  code({ text }) {
    return `
      <side-by-side>
        ${marked.Renderer.prototype.code.call(this, { text })}
        <div>${text}</div>
      </side-by-side>
    `
  },
}
marked.use({ renderer })

const commentDocRegex = /^\/\*\*(.+)?\*\*\//s
const getDocPageFromPath = (filepath: string) => {
  const content = fs.readFileSync(`./src/${filepath}`, 'utf-8')
  const commentMatch = commentDocRegex.exec(content)
  const markdown = commentMatch?.[1].replace(/^\s*\*\s?/gm, '').trim()

  if (!markdown) return []
  return [
    {
      filepath,
      name: filepath.replace('.css', ''),
      markdown: marked(markdown),
    },
  ]
}

// TODO: also watch for changes in dev mode
// see https://bun.com/docs/guides/read-file/watch
export const writeDocPages = () => {
  const docPages = fs
    .readdirSync('./src', { encoding: 'utf8', recursive: true })
    .filter((fname) => fname.endsWith('.css'))
    .flatMap(getDocPageFromPath)

  // Write data to a TS file that Bun's bundler can pick up
  fs.writeFileSync('./playground/data.js', `window.DOCS = ${JSON.stringify(docPages, null, 2)}`)
}
