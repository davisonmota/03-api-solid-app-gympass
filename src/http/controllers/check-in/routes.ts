import { type FastifyInstance } from 'fastify'

import { verifyUserRole } from '@/http/middleware/verify-user-role'
import { verifyJWT } from '../../middleware/verifyJWT'
import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'

export async function checkInsRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.patch('/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate)
}
