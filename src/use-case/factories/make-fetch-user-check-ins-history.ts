import { PrismaCheckInRepository } from '@/repositories/prisma/check-in-repository'
import { FetchCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export const makeFetchCheckInsHistoryUseCase = (): FetchCheckInsHistoryUseCase => {
  const checkInRepository = new PrismaCheckInRepository()
  return new FetchCheckInsHistoryUseCase(checkInRepository)
}
