import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepository)

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
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepository)

    const promise = sut.execute({
      email: 'non-existent-email@example.com',
      password: '123456'
    })

    expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepository)

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
