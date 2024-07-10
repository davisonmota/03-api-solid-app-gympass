import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { type FastifyInstance } from 'fastify'
import supertest from 'supertest'

export async function createAndAuthenticateUser (app: FastifyInstance, role: 'MEMBER' | 'ADMIN' = 'MEMBER'): Promise<{
  name: string
  email: string
  token: string
}> {
  const userData = await prisma.user.create({
    data: {
      name: 'Davison',
      email: 'davison@gmail.com',
      password_hash: await hash('123456', 12),
      role
    }
  })

  const authResponse = await supertest(app.server)
    .post('/sessions')
    .send({
      email: 'davison@gmail.com',
      password: '123456'
    })

  const { token } = authResponse.body

  return {
    name: userData.name,
    email: userData.email,
    token
  }
}
