import { type CheckIn, type CheckInRepository } from '@/repositories/check-in-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface Input {
  userId: string
  gymId: string
}

interface Output {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor (private readonly checkInRepository: CheckInRepository) {}

  async execute ({ userId, gymId }: Input): Promise<Output> {
    const checkIn = await this.checkInRepository.create({ userId, gymId })

    if (!checkIn) {
      throw new ResourceNotFoundError('CheckInNotFound', 'Check in not found.')
    }

    return {
      checkIn
    }
  }
}
