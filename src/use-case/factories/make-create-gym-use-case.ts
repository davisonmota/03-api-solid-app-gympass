import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export const makeCreateGymUseCase = (): CreateGymUseCase => {
  const gymRepository = new PrismaGymsRepository()
  return new CreateGymUseCase(gymRepository)
}
