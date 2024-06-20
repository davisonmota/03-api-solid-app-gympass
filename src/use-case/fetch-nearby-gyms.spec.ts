import { type GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

const makeSut = (): {
  sut: FetchNearbyGymsUseCase
  gymRepository: GymsRepository
} => {
  const gymRepository = new InMemoryGymsRepository()
  const sut = new FetchNearbyGymsUseCase(gymRepository)
  return { sut, gymRepository }
}

describe('Fetch Nearby Gyms Use Case', () => {
  it('should be able to search for gyms', async () => {
    const { sut, gymRepository } = makeSut()

    await gymRepository.create({
      title: 'Academia perto 1',
      latitude: -18.2431993,
      longitude: -43.5966348
    })

    await gymRepository.create({
      title: 'Academia perto 2',
      latitude: -18.2431993,
      longitude: -43.5966348
    })

    // Mais distante do que 10km
    await gymRepository.create({
      title: 'Academia longe 3',
      latitude: -18.2941266,
      longitude: -44.2209433
    })

    const { gyms } = await sut.execute({
      userLatitude: -18.2431993,
      userLongitude: -43.5966348
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia perto 1' }),
      expect.objectContaining({ title: 'Academia perto 2' })
    ])
  })
})
