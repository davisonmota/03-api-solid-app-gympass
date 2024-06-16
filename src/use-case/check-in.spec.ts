import { InMemoryCheckInRepository } from '@/repositories/in-memory/check-in-repository'
import { describe, expect, it } from 'vitest'
import { CheckInUseCase } from './check-in'

const makeSut = (): { checkInRepository: InMemoryCheckInRepository, sut: CheckInUseCase } => {
  const checkInRepository = new InMemoryCheckInRepository()
  const sut = new CheckInUseCase(checkInRepository)
  return { sut, checkInRepository }
}

describe('CheckIn Use Case', () => {
  it('should be able to check in', async () => {
    const { sut } = makeSut()

    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id'
    })

    expect(checkIn.gymId).toBe('gym-id')
    expect(checkIn.userId).toBe('user-id')
  })
})
