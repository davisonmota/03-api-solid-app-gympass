export interface CreateUser {
  name: string
  email: string
  passwordHash: string
}

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
}

export interface UsersRepository {
  create(data: CreateUser): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
}
