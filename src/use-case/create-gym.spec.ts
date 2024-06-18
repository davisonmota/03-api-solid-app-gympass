import { type GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

const makeSut = (): {
  sut: CreateGymUseCase
  gymRepository: GymsRepository
} => {
  const gymRepository = new InMemoryGymsRepository()
  const sut = new CreateGymUseCase(gymRepository)
  return { sut, gymRepository }
}

describe('Create Gym Use Case', () => {
  it('should be able to create a gym', async () => {
    const { sut } = makeSut()

    const { gym } = await sut.execute({
      id: 'gym-id',
      title: 'Gym Title',
      description: 'Gym Description',
      latitude: -18.2454105,
      longitude: -43.6411431
    })

    expect(gym.id).toBe('gym-id')
    expect(gym.title).toBe('Gym Title')
    expect(gym.description).toBe('Gym Description')
    expect(gym.latitude).toBe(-18.2454105)
    expect(gym.longitude).toBe(-43.6411431)
  })
})
