import { type FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middleware/verifyJWT'

export async function gymsRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', verifyJWT)
}
