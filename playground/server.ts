// This magic import will transpile the FE assets, bundle it, and serve it
// See https://bun.sh/docs/bundler/fullstack
import app from './index.html'

import fs from 'node:fs'
import { marked } from 'marked'

const commentDocRegex = /^\/\*\*(.+)?\*\*\//s
const contentToRoute = (fname: string) => () => {
  const content = fs.readFileSync(`./src/${fname}`, 'utf-8')
  const commentMatch = commentDocRegex.exec(content)
  const markdown = commentMatch?.[1].replace(/^\s*\*\s?/gm, '').trim()

  // TODO: convert examples to side-by-side html + code
  // see https://marked.js.org/using_pro
  return new Response(`<!DOCTYPE html><html>${markdown ? marked(markdown) : 'No comment'}</html>`, {
    headers: { 'Content-Type': 'text/html' },
  })
}

const fileTuples = fs
  .readdirSync('./src')
  .filter((fname: string) => fname.endsWith('.css'))
  .map((fname: string) => [`/${fname.replace('.css', '')}`, contentToRoute(fname)])
const docRoutes = Object.fromEntries(fileTuples)

const port = 3333

Bun.serve({
  port,
  development: {
    hmr: true,
    console: true,
  },
  routes: {
    '/*': app,
    ...docRoutes,
  },
})

console.log(`Server running at http://localhost:${port}`)
