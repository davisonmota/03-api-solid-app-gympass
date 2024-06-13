import { prisma } from '@/lib/prisma'

interface CreateUser {
  name: string
  email: string
  passwordHash: string
}

interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
}

export class PrismaUsersRepository {
  async create ({ name, email, passwordHash }: CreateUser): Promise<User> {
    const userData = await prisma.user.create({
      data: {
        email,
        name,
        password_hash: passwordHash
      }
    })

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      createdAt: userData.created_at,
      passwordHash: userData.password_hash
    }
  }
}
