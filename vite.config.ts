import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// In `npm run dev`, serve api/pitch.js the way Vercel does in production, so the
// Pitch an Idea form works locally. Uses DISCORD_PITCH_WEBHOOK from .env.local.
function localApi(mode: string): Plugin {
  return {
    name: 'local-api',
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), '')
      server.middlewares.use('/api/pitch', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        process.env.DISCORD_PITCH_WEBHOOK ??= env.DISCORD_PITCH_WEBHOOK
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const { POST } = await server.ssrLoadModule('/api/pitch.js')
        const response: Response = await POST(
          new Request('http://localhost/api/pitch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: Buffer.concat(chunks).toString(),
          }),
        )
        res.statusCode = response.status
        res.setHeader('Content-Type', 'application/json')
        res.end(await response.text())
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), localApi(mode)],
}))
