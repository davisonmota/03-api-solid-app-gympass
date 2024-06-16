import { prisma } from '@/lib/prisma'
import { type CreateUser, type User, type UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
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
      passwordHash: userData.password_hash
    }
  }

  async findByEmail (email: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!userData) return null

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      passwordHash: userData.password_hash
    }
  }

  async findById (userId: string): Promise<User | null> {
    const userData = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!userData) return null

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      passwordHash: userData.password_hash
    }
  }
}
