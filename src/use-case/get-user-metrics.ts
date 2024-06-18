import { type CheckInRepository } from '@/repositories/check-in-repository'

interface Input {
  userId: string
}

interface Output {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor (
    private readonly checkInRepository: CheckInRepository
  ) {}

  async execute ({ userId }: Input): Promise<Output> {
    const checkInsCount = await this.checkInRepository.contByUserId(userId)

    return {
      checkInsCount
    }
  }
}
