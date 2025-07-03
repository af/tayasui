// This magic import will transpile the FE assets, bundle it, and serve it
// See https://bun.sh/docs/bundler/fullstack
import app from './index.html'

const port = 3333

Bun.serve({
  port,
  development: true, // Enables hot reloading
  routes: {
    '/*': app,
  },
})

console.log(`Server running at http://localhost:${port}`)
