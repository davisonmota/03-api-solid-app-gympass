import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { EmailAlreadyExistsError } from '@/use-case/erros/user-already-exists'
import { RegisterUserUseCase } from '@/use-case/register-user'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerUser (
  request: FastifyRequest,
  replay: FastifyReply
): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  try {
    const { name, email, password } = registerBodySchema.parse(request.body)

    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(prismaUsersRepository)
    const user = await registerUserUseCase.execute({ name, email, password })
    return replay.status(201).send(user)
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return replay.status(409).send({ message: error.message })
    }

    throw error
  }
}
