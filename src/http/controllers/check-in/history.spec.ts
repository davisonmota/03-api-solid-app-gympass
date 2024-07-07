import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

describe('Check-in History(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const createGymResponse = await supertest(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym e2e',
        description: 'Some description e2e',
        latitude: -18.2454105,
        longitude: -43.6411431
      })

    const gymId = createGymResponse.body.gym.id

    vi.setSystemTime(new Date('2024-06-06T09:00:00'))
    await supertest(app.server)
      .post(`/gyms/${gymId}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -18.2454105,
        longitude: -43.6411431
      })

    vi.setSystemTime(new Date('2024-06-07T10:00:00'))
    await supertest(app.server)
      .post(`/gyms/${gymId}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -18.2454105,
        longitude: -43.6411431
      })

    const response = await supertest(app.server)
      .get('/check-ins/history')
      .query({
        page: 1
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.checkIns).toHaveLength(2)
  })
})
