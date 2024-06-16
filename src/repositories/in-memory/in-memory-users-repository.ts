import { type User, type CreateUser, type UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  private readonly users: User[] = []

  async create ({ name, email, passwordHash }: CreateUser): Promise<User> {
    const user = {
      id: this.users.length.toString(),
      email,
      name,
      passwordHash
    }

    this.users.push(user)

    return user
  }

  async findByEmail (email: string): Promise<User | null> {
    const userData = this.users.find(user => user.email === email)
    if (!userData) return null

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      passwordHash: userData.passwordHash
    }
  }

  async findById (userId: string): Promise<User | null> {
    const userData = this.users.find(user => user.id === userId)
    if (!userData) return null

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      passwordHash: userData.passwordHash
    }
  }
}
