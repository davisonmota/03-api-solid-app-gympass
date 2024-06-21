import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { type CheckIn, type CheckInRepository, type CreateCheckIn } from '../check-in-repository'

export class PrismaCheckInRepository implements CheckInRepository {
  async create ({ userId, gymId }: CreateCheckIn): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data: {
        user_id: userId,
        gym_id: gymId
      }
    })

    return {
      id: checkIn.id,
      userId: checkIn.user_id,
      gymId: checkIn.gym_id,
      createdAt: checkIn.created_at,
      validatedAt: checkIn.validated_at
    }
  }

  async findByUserIdOnDate (userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInData = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })

    if (!checkInData) return null

    return {
      id: checkInData.id,
      userId: checkInData.user_id,
      gymId: checkInData.gym_id,
      createdAt: checkInData.created_at,
      validatedAt: checkInData.validated_at
    }
  }

  async findManyByUserId (id: string, page: number): Promise<CheckIn[]> {
    const checkInsData = await prisma.checkIn.findMany({
      where: {
        user_id: id
      },
      take: 20,
      skip: (page - 1) * 20
    })

    const checkIns = checkInsData.map(checkInData => {
      return {
        id: checkInData.id,
        userId: checkInData.user_id,
        gymId: checkInData.gym_id,
        createdAt: checkInData.created_at,
        validatedAt: checkInData.validated_at
      }
    })

    return checkIns
  }

  async contByUserId (id: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        id
      }
    })

    return count
  }

  async findById (id: string): Promise<CheckIn | null> {
    const checkInData = await prisma.checkIn.findUnique({
      where: {
        id
      }
    })

    if (!checkInData) return null

    return {
      id: checkInData.id,
      userId: checkInData.user_id,
      gymId: checkInData.gym_id,
      createdAt: checkInData.created_at,
      validatedAt: checkInData.validated_at
    }
  }

  async updateValidatedAt (id: string, date: Date): Promise<CheckIn | null> {
    const checkInData = await prisma.checkIn.update({
      where: {
        id
      },
      data: {
        validated_at: date
      }
    })

    if (!checkInData) return null

    return {
      id: checkInData.id,
      userId: checkInData.user_id,
      gymId: checkInData.gym_id,
      createdAt: checkInData.created_at,
      validatedAt: checkInData.validated_at
    }
  }
}
