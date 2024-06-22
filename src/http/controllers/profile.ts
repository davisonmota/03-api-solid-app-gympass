import { makeGetUserProfileUseCase } from '@/use-case/factories/make-get-user-profile'
import { type FastifyReply, type FastifyRequest } from 'fastify'

export async function profile (
  request: FastifyRequest,
  replay: FastifyReply
): Promise<FastifyReply> {
  const getUserProfile = makeGetUserProfileUseCase()
  const { user } = await getUserProfile.execute({ userId: request.user.sub })

  return replay.status(200).send({ user })
}
