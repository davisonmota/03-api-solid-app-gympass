import { makeSearchGymsUseCase } from '@/use-case/factories/make-search-gyms'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search (
  request: FastifyRequest,
  replay: FastifyReply
): Promise<FastifyReply> {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { query, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const gyms = await searchGymsUseCase.execute({ query, page })
  return replay.status(201).send(gyms)
}
