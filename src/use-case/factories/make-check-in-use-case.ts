import { PrismaCheckInRepository } from '@/repositories/prisma/check-in-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'

export const makeCheckInUseCase = (): CheckInUseCase => {
  const checkInRepository = new PrismaCheckInRepository()
  const gymRepository = new PrismaGymsRepository()
  return new CheckInUseCase(checkInRepository, gymRepository)
}
