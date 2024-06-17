import { type CheckIn, type CheckInRepository, type CreateCheckIn } from '../check-in-repository'

export class InMemoryCheckInRepository implements CheckInRepository {
  private readonly checkIns: CheckIn[] = []

  async create ({ userId, gymId }: CreateCheckIn): Promise<CheckIn> {
    const checkIn = {
      id: this.checkIns.length.toString(),
      userId,
      gymId,
      createdAt: new Date(),
      validatedAt: null
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate (userId: string, date: Date): Promise<CheckIn | null> {
    const checkInOnSameDate = this.checkIns.find(checkIn => checkIn.userId === userId)
    if (!checkInOnSameDate) return null

    return checkInOnSameDate
  }
}
