import { type Gym, type GymsRepository } from '@/repositories/gyms-repository'

interface Input {
  query: string
  page: number
}

interface Output {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor (private readonly gymsRepository: GymsRepository) {}

  async execute ({ query, page }: Input): Promise<Output> {
    const gyms = await this.gymsRepository.searchManyBy(query, page)

    return {
      gyms
    }
  }
}
