/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { app } from '@/app'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
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

    const cookies = authResponse.get('Set-Cookie')!

    const response = await supertest(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})
