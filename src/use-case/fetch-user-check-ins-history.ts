import { type CheckIn, type CheckInRepository } from '@/repositories/check-in-repository'

interface Input {
  userId: string
  page: number
}

interface Output {
  checkIns: CheckIn[]
}

export class FetchCheckInsHistoryUseCase {
  constructor (
    private readonly checkInRepository: CheckInRepository
  ) {}

  async execute ({ userId, page }: Input): Promise<Output> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return {
      checkIns
    }
  }
}
