import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

const makeSut = (): {
  checkInRepository: InMemoryCheckInRepository
  sut: GetUserMetricsUseCase
} => {
  const checkInRepository = new InMemoryCheckInRepository()
  const sut = new GetUserMetricsUseCase(checkInRepository)
  return { sut, checkInRepository }
}

describe('Get User Metrics Use Case', () => {
  it('should be able to get check-is user count from metrics', async () => {
    const { sut, checkInRepository } = makeSut()

    await checkInRepository.create({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    await checkInRepository.create({
      gymId: 'gym-02',
      userId: 'user-01'
    })

    await checkInRepository.create({
      gymId: 'gym-02',
      userId: 'user-01'
    })

    const { checkInsCount } = await sut.execute({ userId: 'user-01' })

    expect(checkInsCount).toBe(3)
  })
})
