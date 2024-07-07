import { type FastifyInstance } from 'fastify'
import supertest from 'supertest'

export async function createAndAuthenticateUser (app: FastifyInstance): Promise<{
  name: string
  email: string
  password: string
  token: string
}> {
  const userCreateData = {
    name: 'Davison Mota',
    email: 'davison@gmail.com',
    password: '123456'
  }

  await supertest(app.server)
    .post('/users')
    .send(userCreateData)

  const authResponse = await supertest(app.server)
    .post('/sessions')
    .send({
      email: 'davison@gmail.com',
      password: '123456'
    })

  const { token } = authResponse.body

  return {
    ...userCreateData,
    token
  }
}
