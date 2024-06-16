import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { type UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile'

const makeSut = (): { userRepository: UsersRepository, sut: GetUserProfileUseCase } => {
  const userRepository = new InMemoryUsersRepository()
  const sut = new GetUserProfileUseCase(userRepository)
  return { sut, userRepository }
}

describe('Get User Profile Use Case', () => {
  it('should be able to get user profile by id', async () => {
    const { userRepository, sut } = makeSut()

    const { id } = await userRepository.create({
      name: 'davison',
      email: 'davison@example.com',
      passwordHash: await hash('123456', 6)
    })

    const { user } = await sut.execute({ userId: id })

    expect(user.id).toBe(id)
    expect(user.email).toBe('davison@example.com')
    expect(user.name).toBe('davison')
  })

  it('should not be able to get user profile with wrong id', async () => {
    const { sut } = makeSut()

    const promise = sut.execute({ userId: 'id-user-not-exist' })

    await expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
