import { type FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middleware/verifyJWT'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { registerUser } from './register'

export async function usersRoutes (app: FastifyInstance): Promise<void> {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', {
    onRequest: [verifyJWT]
  }, profile)
}
