import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

describe('Check-in Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the count of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

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
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.checkInsCount).toBe(2)
  })
})
