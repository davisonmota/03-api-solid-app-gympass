import { type User, type UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface Input {
  email: string
  password: string
}

interface Output {
  user: Omit<User, 'passwordHash'>
}

export class AuthenticateUseCase {
  constructor (private readonly userRepository: UsersRepository) {}

  async execute ({ email, password }: Input): Promise<Output> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordValid = await compare(password, user.passwordHash)

    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }
}
