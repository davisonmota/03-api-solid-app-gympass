import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create  check-in ', async () => {
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

    const response = await supertest(app.server)
      .post(`/gyms/${gymId}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -18.2454105,
        longitude: -43.6411431
      })

    expect(response.statusCode).toBe(201)
  })
})
