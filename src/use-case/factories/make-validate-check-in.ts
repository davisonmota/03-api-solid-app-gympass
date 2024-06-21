import { PrismaCheckInRepository } from '@/repositories/prisma/check-in-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export const makeValidateCheckInUseCase = (): ValidateCheckInUseCase => {
  const checkInRepository = new PrismaCheckInRepository()
  return new ValidateCheckInUseCase(checkInRepository)
}
