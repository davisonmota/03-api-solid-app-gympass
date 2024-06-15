import { describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from './register-user'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUserUseCase(prismaUsersRepository)

    await registerUseCase.execute({
      name: 'Davison',
      email: 'davisonaee@gmail.com',
      password: '123456789'
    })
    const userHash = await prisma.user.findUnique({
      where: {
        email: 'davisonaee@gmail.com'
      },
      select: {
        password_hash: true
      }
    })
    const hashedPassword = userHash?.password_hash

    const passwordIsValid = await compare('123456789', hashedPassword ?? '')

    expect(passwordIsValid).toBe(true)
  })
})
