import { type FastifyReply, type FastifyRequest } from 'fastify'

export async function profile (
  request: FastifyRequest,
  replay: FastifyReply
): Promise<FastifyReply> {
  await request.jwtVerify()
  return replay.status(200).send()
}
