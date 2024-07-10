import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gym', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    await supertest(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym e2e',
        description: 'Some description e2e',
        latitude: -18.2454105,
        longitude: -43.6411431
      })

    await supertest(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Other Gym e2e',
        description: 'Some description Other Gym e2e',
        latitude: -18.2454105,
        longitude: -43.6411431
      })

    const response = await supertest(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        query: 'Other',
        page: 1
      })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: 'Other Gym e2e',
        description: 'Some description Other Gym e2e',
        latitude: -18.2454105,
        longitude: -43.6411431
      })
    ])
  })
})
