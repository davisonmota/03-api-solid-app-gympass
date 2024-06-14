import { type User, type UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute ({
    name,
    email,
    password
  }: RegisterUserUseCaseRequest): Promise<User> {
    const passwordHash = await hash(password, 12)

    const userWithEmail = await this.usersRepository.findByEmail(email)

    if (userWithEmail) {
      throw new Error('User already exists.')
    }

    return await this.usersRepository.create({ name, email, passwordHash })
  }
}
