import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export const makeSearchGymsUseCase = (): SearchGymsUseCase => {
  const gymRepository = new PrismaGymsRepository()
  return new SearchGymsUseCase(gymRepository)
}
