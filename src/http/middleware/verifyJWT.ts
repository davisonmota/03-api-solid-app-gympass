import { type FastifyReply, type FastifyRequest } from 'fastify'

export async function verifyJWT (
  request: FastifyRequest,
  replay: FastifyReply
): Promise<void> {
  try {
    await request.jwtVerify()
  } catch (error) {
    return replay.status(401).send({ message: 'Unauthorized' })
  }
}
