import { type User, type UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface Input {
  userId: string
}

interface Output {
  user: Omit<User, 'passwordHash'>
}

export class GetUserProfileUseCase {
  constructor (private readonly userRepository: UsersRepository) {}

  async execute ({ userId }: Input): Promise<Output> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError('UserNotFound', 'User not found.')
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
