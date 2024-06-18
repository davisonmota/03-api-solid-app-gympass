import { type GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { MaxDistanceError } from './erros/max-distance-error'
import { MaxNumberOfCheckInsError } from './erros/max-number-of-check-ins-error'

const makeSut = (): {
  checkInRepository: InMemoryCheckInRepository
  sut: CheckInUseCase
  gymRepository: GymsRepository
} => {
  const checkInRepository = new InMemoryCheckInRepository()
  const gymRepository = new InMemoryGymsRepository()
  const sut = new CheckInUseCase(checkInRepository, gymRepository)
  return { sut, checkInRepository, gymRepository }
}

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { sut, gymRepository } = makeSut()

    await gymRepository.create({
      id: 'gym-id',
      title: 'Gym Title',
      description: 'Gym Description',
      latitude: 0,
      longitude: 0
    })

    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: 0,
      userLongitude: 0
    })

    expect(checkIn.gymId).toBe('gym-id')
    expect(checkIn.userId).toBe('user-id')
  })

  it('should not be able to check in twice in the same day', async () => {
    const { sut, gymRepository } = makeSut()
    vi.setSystemTime(new Date('2023-06-17T09:00:00'))

    await gymRepository.create({
      id: 'gym-id',
      title: 'Gym Title',
      description: 'Gym Description',
      latitude: 0,
      longitude: 0
    })

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      checkInDate: new Date(),
      userLatitude: 0,
      userLongitude: 0
    })

    await expect(async () => sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      checkInDate: new Date(),
      userLatitude: 0,
      userLongitude: 0
    })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    const { sut, gymRepository } = makeSut()

    await gymRepository.create({
      id: 'gym-id',
      title: 'Gym Title',
      description: 'Gym Description',
      latitude: 0,
      longitude: 0
    })

    vi.setSystemTime(new Date('2023-06-17T09:00:00'))
    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      checkInDate: new Date(),
      userLatitude: 0,
      userLongitude: 0
    })

    vi.setSystemTime(new Date('2023-06-20T09:00:00'))
    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      checkInDate: new Date(),
      userLatitude: 0,
      userLongitude: 0
    })

    expect(checkIn.gymId).toBe('gym-id')
    expect(checkIn.userId).toBe('user-id')
  })

  it('should not be able to check on distant gym', async () => {
    const { sut, gymRepository } = makeSut()

    await gymRepository.create({
      id: 'gym-id-02',
      title: 'Gym Title',
      description: 'Gym Description',
      latitude: -18.2393935,
      longitude: -43.5895216
    })

    await expect(async () => sut.execute({
      userId: 'user-id',
      gymId: 'gym-id-02',
      checkInDate: new Date(),
      userLatitude: -18.2454105,
      userLongitude: -43.6411431
    })).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
