import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-case/authenticate'
import { InvalidCredentialsError } from '@/use-case/erros/invalid-credentials-error'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate (
  request: FastifyRequest,
  replay: FastifyReply
): Promise<FastifyReply> {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  try {
    const { email, password } = authenticateBodySchema.parse(request.body)

    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
    const output = await authenticateUseCase.execute({ email, password })

    return replay.status(200).send(output)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return replay.status(400).send({ message: error.message })
    }

    throw error
  }
}
