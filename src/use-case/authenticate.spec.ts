import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'
import { type UsersRepository } from '@/repositories/users-repository'

const makeSut = (): { userRepository: UsersRepository, sut: AuthenticateUseCase } => {
  const userRepository = new InMemoryUsersRepository()
  const sut = new AuthenticateUseCase(userRepository)
  return { sut, userRepository }
}

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const { userRepository, sut } = makeSut()

    await userRepository.create({
      name: 'davison',
      email: 'davison@example.com',
      passwordHash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'davison@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.email).toBe('davison@example.com')
  })

  it('should not be able to authenticate with wrong email', async () => {
    const { sut } = makeSut()

    const promise = sut.execute({
      email: 'non-existent-email@example.com',
      password: '123456'
    })

    expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const { userRepository, sut } = makeSut()

    await userRepository.create({
      name: 'davison',
      email: 'davison@example.com',
      passwordHash: await hash('123456', 6)
    })

    const promise = sut.execute({
      email: 'davison@example.com',
      password: 'invalid-password'
    })

    expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
