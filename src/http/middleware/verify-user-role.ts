import { type FastifyReply, type FastifyRequest } from 'fastify'

export function verifyUserRole (roleToVerify: 'MEMBER' | 'ADMIN') {
  return async (request: FastifyRequest, replay: FastifyReply) => {
    const { role } = request.user
    if (role !== roleToVerify) {
      return replay.status(401).send({ message: 'Unauthorized' })
    }
  }
}
