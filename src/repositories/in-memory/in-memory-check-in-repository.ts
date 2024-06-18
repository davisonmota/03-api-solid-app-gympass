import dayjs from 'dayjs'
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
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.checkIns.find(checkIn => {
      const checkInDate = dayjs(checkIn.createdAt)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.userId === userId && isOnSameDate
    })
    if (!checkInOnSameDate) return null

    return checkInOnSameDate
  }
}