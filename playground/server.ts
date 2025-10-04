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

  return new Response(`<!DOCTYPE html><html>${markdown ? marked(markdown) : 'No comment'}</html>`, {
    headers: { 'Content-Type': 'text/html' },
  })
}

const fileTuples = fs
  .readdirSync('./src')
  .filter((fname) => fname.endsWith('.css'))
  .map((fname) => ['/' + fname.replace('.css', ''), contentToRoute(fname)])

const routes = Object.fromEntries(fileTuples)

const port = 3333

Bun.serve({
  port,
  development: true, // Enables hot reloading
  routes: {
    '/*': app,
    ...routes,
  },
})

console.log(`Server running at http://localhost:${port}`)
