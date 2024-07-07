import { makeGetUserMetricsUseCase } from '@/use-case/factories/make-get-user-metrics'
import { type FastifyReply, type FastifyRequest } from 'fastify'

export async function metrics (
  request: FastifyRequest,
  replay: FastifyReply
): Promise<FastifyReply> {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub

  })
  return replay.status(200).send({ checkInsCount })
}
