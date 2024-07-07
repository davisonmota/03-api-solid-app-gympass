import { makeFetchCheckInsHistoryUseCase } from '@/use-case/factories/make-fetch-user-check-ins-history'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history (
  request: FastifyRequest,
  replay: FastifyReply
): Promise<FastifyReply> {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchCheckInsHistoryUseCase = makeFetchCheckInsHistoryUseCase()

  const { checkIns } = await fetchCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page
  })
  return replay.status(200).send({ checkIns })
}
