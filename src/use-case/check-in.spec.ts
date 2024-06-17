import { InMemoryCheckInRepository } from '@/repositories/in-memory/check-in-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

const makeSut = (): { checkInRepository: InMemoryCheckInRepository, sut: CheckInUseCase } => {
  const checkInRepository = new InMemoryCheckInRepository()
  const sut = new CheckInUseCase(checkInRepository)
  return { sut, checkInRepository }
}

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { sut } = makeSut()

    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id'
    })

    expect(checkIn.gymId).toBe('gym-id')
    expect(checkIn.userId).toBe('user-id')
  })

  it('should not be able to check in twice in the same day', async () => {
    const { sut } = makeSut()
    vi.setSystemTime(new Date('2023-06-17T09:00:00'))

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id'
    })

    await expect(async () => sut.execute({
      userId: 'user-id',
      gymId: 'gym-id'
    })).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    const { sut } = makeSut()

    vi.setSystemTime(new Date('2023-06-17T09:00:00'))
    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id'
    })

    vi.setSystemTime(new Date('2023-06-20T09:00:00'))
    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id'
    })

    expect(checkIn.gymId).toBe('gym-id')
    expect(checkIn.userId).toBe('user-id')
  })
})
