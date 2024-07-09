import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
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
    const { user } = await authenticateUseCase.execute({ email, password })

    const accessToken = await replay.jwtSign({}, {
      sign: {
        sub: user.id
      }
    })

    const refreshToken = await replay.jwtSign({}, {
      sign: {
        sub: user.id,
        expiresIn: '7d'
      }
    })

    return replay
      .setCookie('refreshToken', refreshToken, {
        path: '/', // quais rotas tem acesso à esse cookie
        secure: true,
        sameSite: true,
        httpOnly: true
      })
      .status(200)
      .send({ user, token: accessToken })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return replay.status(400).send({ message: error.message })
    }

    throw error
  }
}
