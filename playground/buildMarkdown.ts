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

  let markdown: string | undefined
  if (filepath.endsWith('.md')) {
    markdown = content.trim()
  } else {
    const commentMatch = commentDocRegex.exec(content)
    markdown = commentMatch?.[1].trim()
  }

  if (!markdown) return []
  return [
    {
      filepath,
      name: filepath.replace(/\.(css|md)$/, ''),
      markdown: marked(markdown),
    },
  ]
}

export const writeDocPages = () => {
  const docPages = fs
    .readdirSync('./src', { encoding: 'utf8', recursive: true })
    .filter((fname) => fname.endsWith('.css') || fname.endsWith('.md'))
    .flatMap(getDocPageFromPath)

  // Write data to a TS file that Bun's bundler can pick up
  fs.writeFileSync('./playground/data.js', `window.DOCS = ${JSON.stringify(docPages, null, 2)}`)
}

// also watch for changes and re-build docs on css changes in dev mode
// see https://bun.com/docs/guides/read-file/watch
//
// TODO: this is inefficient; should only build the changed file, not everything
if (process.env.NODE_ENV !== 'production') {
  fs.watch('./src', { recursive: true }, (_event, filename) => {
    if (filename?.endsWith('.css') || filename?.endsWith('.md')) writeDocPages()
  })
}
