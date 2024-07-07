import { app } from '@/app'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await supertest(app.server)
      .post('/users')
      .send({
        name: 'Davison Mota',
        email: 'davison@gmail.com',
        password: '123456'
      })

    expect(response.statusCode).toBe(201)
  })
})
