import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { describe, expect, it } from 'vitest'
import { FetchCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

const makeSut = (): {
  checkInRepository: InMemoryCheckInRepository
  sut: FetchCheckInsHistoryUseCase
} => {
  const checkInRepository = new InMemoryCheckInRepository()
  const sut = new FetchCheckInsHistoryUseCase(checkInRepository)
  return { sut, checkInRepository }
}

describe('Fetch Check Ins History Use Case', () => {
  it('should be able to fetch checks-ins history', async () => {
    const { sut, checkInRepository } = makeSut()

    await checkInRepository.create({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    await checkInRepository.create({
      gymId: 'gym-02',
      userId: 'user-01'
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' })
    ])
  })

  it('should be able to fetch paginated user checks-ins history', async () => {
    const { sut, checkInRepository } = makeSut()
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gymId: `gym-${i}`,
        userId: 'user-01'
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' })
    ])
  })
})
