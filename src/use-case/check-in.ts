import { type CheckIn, type CheckInRepository } from '@/repositories/check-in-repository'
import { type GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface Input {
  userId: string
  gymId: string
  checkInDate?: Date
  userLatitude: number
  userLongitude: number
}

interface Output {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor (
    private readonly checkInRepository: CheckInRepository,
    private readonly gymRepository: GymsRepository
  ) {}

  async execute ({ userId, gymId, checkInDate = new Date() }: Input): Promise<Output> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError('GymNotFound', 'Gym not found.')
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId, checkInDate)

    if (checkInOnSameDay) throw new Error()

    const checkIn = await this.checkInRepository.create({ userId, gymId })

    if (!checkIn) {
      throw new ResourceNotFoundError('CheckInNotFound', 'Check in not found.')
    }

    return {
      checkIn
    }
  }
}
