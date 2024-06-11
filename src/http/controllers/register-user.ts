import { registerUserUseCase } from '@/use-case/register-user'
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
    await registerUserUseCase({ name, email, password })
    return replay.status(201).send()
  } catch (error) {
    return replay.status(409).send()
  }
}
