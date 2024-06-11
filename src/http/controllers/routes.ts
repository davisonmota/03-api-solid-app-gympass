import { type FastifyInstance } from 'fastify'
import { registerUser } from './register-user'

export async function appRoutes (app: FastifyInstance): Promise<void> {
  app.post('/users', registerUser)
}
