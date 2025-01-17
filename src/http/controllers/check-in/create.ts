import { makeCheckInUseCase } from '@/use-case/factories/make-check-in-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create (
  request: FastifyRequest,
  replay: FastifyReply
): Promise<FastifyReply> {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })
  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const checkInUseCase = makeCheckInUseCase()

  const { checkIn } = await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  })
  return replay.status(201).send({ checkIn })
}
