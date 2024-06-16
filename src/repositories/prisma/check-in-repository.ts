import { prisma } from '@/lib/prisma'
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
}
