import { type CheckIn, type CheckInRepository } from '@/repositories/check-in-repository'
import { InvalidCheckInError } from './erros/invalid-check-in-error'
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

    const nowInMilliseconds = new Date().getTime()
    const createdCheckInDateInMilliseconds = validatedCheckIn.createdAt.getTime()

    const differenceBetweenCheckInCreationDateAndNowInMilliseconds =
    nowInMilliseconds - createdCheckInDateInMilliseconds

    const twentyMinutesInMilliseconds = 20 * 60 * 1000
    if (differenceBetweenCheckInCreationDateAndNowInMilliseconds > twentyMinutesInMilliseconds) {
      throw new InvalidCheckInError('Check-in validate after 20 minutes')
    }

    return {
      checkIn: validatedCheckIn
    }
  }
}
