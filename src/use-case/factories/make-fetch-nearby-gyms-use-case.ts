import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export const makeFetchNearbyGymsUseCase = (): FetchNearbyGymsUseCase => {
  const gymRepository = new PrismaGymsRepository()
  return new FetchNearbyGymsUseCase(gymRepository)
}
