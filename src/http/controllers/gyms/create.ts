import { makeCreateGymUseCase } from '@/use-case/factories/make-create-gym-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create (
  request: FastifyRequest,
  replay: FastifyReply
): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { title, description, latitude, longitude } = registerBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()

  const gym = await createGymUseCase.execute({ title, description, latitude, longitude })
  return replay.status(201).send(gym)
}
