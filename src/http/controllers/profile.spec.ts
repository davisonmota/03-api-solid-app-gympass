import { app } from '@/app'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await supertest(app.server)
      .post('/users')
      .send({
        name: 'Davison Mota',
        email: 'davison@gmail.com',
        password: '123456'
      })

    const authResponse = await supertest(app.server)
      .post('/sessions')
      .send({
        email: 'davison@gmail.com',
        password: '123456'
      })

    const { token } = authResponse.body

    const profileResponse = await supertest(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toBe(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'davison@gmail.com'
      })
    )
  })
})
