import { type FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middleware/verifyJWT'
import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'

export async function checkInsRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', verifyJWT)

  app.post('/check-ins/history', history)
  app.post('/check-ins/metrics', metrics)

  app.post('/gyms/:gymIn/check-in', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}
