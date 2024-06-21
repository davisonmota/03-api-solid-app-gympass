import { PrismaCheckInRepository } from '@/repositories/prisma/check-in-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export const makeGetUserMetricsUseCase = (): GetUserMetricsUseCase => {
  const checkInRepository = new PrismaCheckInRepository()
  return new GetUserMetricsUseCase(checkInRepository)
}
