import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUserUseCase (
  {
    name,
    email,
    password
  }: RegisterUserUseCaseRequest
): Promise<void> {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists')
  }

  const passwordHash = await hash(password, 12)
  const prismaUsersRepository = new PrismaUsersRepository()
  await prismaUsersRepository.create({ name, email, password_hash: passwordHash })
}
