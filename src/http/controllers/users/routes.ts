import { type FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middleware/verifyJWT'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { registerUser } from './register'

export async function usersRoutes (app: FastifyInstance): Promise<void> {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', {
    onRequest: [verifyJWT]
  }, profile)
}
