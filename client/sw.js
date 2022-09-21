import { setupWorker, rest } from 'msw'

const worker = setupWorker(
  // Provide request handlers
  rest.get('/api/tree/', (req, res, ctx) => {
    return res(ctx.json([]))
  })
)

// Start the Mock Service Worker
worker.start()
