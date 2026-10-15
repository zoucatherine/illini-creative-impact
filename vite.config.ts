import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// In `npm run dev`, serve api/pitch.js and api/join.js the way Vercel does in production, so
// the Share an Idea and Join forms work locally. Uses the Discord webhooks from .env.local.
function localApi(mode: string): Plugin {
  return {
    name: 'local-api',
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), '')
      // Only copy keys that are set: assigning undefined to process.env stores the string "undefined".
      for (const key of ['DISCORD_PITCH_WEBHOOK', 'DISCORD_JOIN_WEBHOOK']) {
        if (env[key]) process.env[key] ??= env[key]
      }
      for (const name of ['pitch', 'join']) {
        server.middlewares.use(`/api/${name}`, async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end()
            return
          }
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const { POST } = await server.ssrLoadModule(`/api/${name}.js`)
          const response: Response = await POST(
            new Request(`http://localhost/api/${name}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: Buffer.concat(chunks).toString(),
            }),
          )
          res.statusCode = response.status
          res.setHeader('Content-Type', 'application/json')
          res.end(await response.text())
        })
      }
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), localApi(mode)],
}))
