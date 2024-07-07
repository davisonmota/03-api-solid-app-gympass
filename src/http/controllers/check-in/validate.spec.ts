import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Validate Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate check-in ', async () => {
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

    const createCheckInResponse = await supertest(app.server)
      .post(`/gyms/${gymId}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -18.2454105,
        longitude: -43.6411431
      })

    const checkInId = createCheckInResponse.body.checkIn.id

    const response = await supertest(app.server)
      .patch(`/check-ins/${checkInId}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(204)
  })
})
