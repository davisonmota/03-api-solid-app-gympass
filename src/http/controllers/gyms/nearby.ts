import { makeFetchNearbyGymsUseCase } from '@/use-case/factories/make-fetch-nearby-gyms-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby (
  request: FastifyRequest,
  replay: FastifyReply
): Promise<FastifyReply> {
  const nearbyGymsSchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = nearbyGymsSchema.parse(request.query)

  const nearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const gyms = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
  })
  return replay.status(200).send(gyms)
}
