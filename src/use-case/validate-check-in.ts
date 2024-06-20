import { type CheckIn, type CheckInRepository } from '@/repositories/check-in-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface Input {
  checkInId: string
}

interface Output {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor (
    private readonly checkInRepository: CheckInRepository
  ) {}

  async execute ({ checkInId }: Input): Promise<Output> {
    const validatedCheckIn = await this.checkInRepository.updateValidatedAt(checkInId, new Date())

    if (!validatedCheckIn) {
      throw new ResourceNotFoundError('CheckInNotFound', 'Check-in not found.')
    }

    return {
      checkIn: validatedCheckIn
    }
  }
}
