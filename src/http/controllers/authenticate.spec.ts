import { app } from '@/app'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await supertest(app.server)
      .post('/users')
      .send({
        name: 'Davison Mota',
        email: 'davison@gmail.com',
        password: '123456'
      })

    const response = await supertest(app.server)
      .post('/sessions')
      .send({
        email: 'davison@gmail.com',
        password: '123456'
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
