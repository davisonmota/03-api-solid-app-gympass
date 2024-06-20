import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import { ValidateCheckInUseCase } from './validate-check-in'

const makeSut = (): {
  checkInRepository: InMemoryCheckInRepository
  sut: ValidateCheckInUseCase
} => {
  const checkInRepository = new InMemoryCheckInRepository()
  const sut = new ValidateCheckInUseCase(checkInRepository)
  return { sut, checkInRepository }
}

describe('Validate CheckIn Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const { sut, checkInRepository } = makeSut()

    const newCheckIn = await checkInRepository.create({
      userId: 'user-id',
      gymId: 'gym-id'
    })

    vi.setSystemTime(new Date('2024-06-20T12:00:00'))
    const { checkIn } = await sut.execute({ checkInId: newCheckIn.id })

    expect(checkIn.gymId).toBe('gym-id')
    expect(checkIn.userId).toBe('user-id')
    expect(checkIn.validatedAt).toEqual(new Date('2024-06-20T12:00:00'))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    const { sut } = makeSut()

    vi.setSystemTime(new Date('2024-06-20T12:00:00'))
    const checkInPromise = sut.execute({ checkInId: 'inexistent-check-in-id' })

    await expect(checkInPromise).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
