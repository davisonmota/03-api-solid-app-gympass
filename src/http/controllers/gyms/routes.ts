import { type FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middleware/verifyJWT'

import { verifyUserRole } from '@/http/middleware/verify-user-role'
import { create } from './create'
import { nearby } from './nearby'
import { search } from './search'

export async function gymsRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
