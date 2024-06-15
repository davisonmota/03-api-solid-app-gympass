import { type CreateUser, type User, type UsersRepository } from './users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  private readonly users: User[] = []

  async create ({ name, email, passwordHash }: CreateUser): Promise<User> {
    this.users.push({
      id: this.users.length.toString(),
      email,
      name,
      passwordHash
    })

    return {
      id: this.users.length.toString(),
      email,
      name,
      passwordHash
    }
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
}
