import { type GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

const makeSut = (): {
  sut: SearchGymsUseCase
  gymRepository: GymsRepository
} => {
  const gymRepository = new InMemoryGymsRepository()
  const sut = new SearchGymsUseCase(gymRepository)
  return { sut, gymRepository }
}

describe('Search Gyms Use Case', () => {
  it('should be able to search for gyms', async () => {
    const { sut, gymRepository } = makeSut()

    await gymRepository.create({
      title: 'Academia 1',
      latitude: 0,
      longitude: 0
    })

    await gymRepository.create({
      title: 'Academia 2',
      latitude: 2,
      longitude: 2
    })

    await gymRepository.create({
      title: 'Academia 3',
      latitude: 3,
      longitude: 3
    })

    await gymRepository.create({
      title: 'Fit',
      latitude: 4,
      longitude: 4
    })

    const query = 'Academia'
    const { gyms } = await sut.execute({
      query,
      page: 1
    })

    expect(gyms).toHaveLength(3)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia 1' }),
      expect.objectContaining({ title: 'Academia 2' }),
      expect.objectContaining({ title: 'Academia 3' })
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    const { sut, gymRepository } = makeSut()
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Academia ${i}`,
        latitude: i,
        longitude: i
      })
    }

    const { gyms } = await sut.execute({
      query: 'Academia',
      page: 2
    })

    console.log(gyms)
    expect(gyms).toHaveLength(2)
  })
})
