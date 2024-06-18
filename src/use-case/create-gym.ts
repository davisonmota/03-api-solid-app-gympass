import { type Gym, type GymsRepository } from '@/repositories/gyms-repository'

interface Input {
  id?: string
  title: string
  description: string | null
  latitude: number
  longitude: number
}

interface Output {
  gym: Gym
}

export class CreateGymUseCase {
  constructor (private readonly gymsRepository: GymsRepository) {}

  async execute (dataCreateGym: Input): Promise<Output> {
    const gymData = await this.gymsRepository.create(dataCreateGym)

    return {
      gym: {
        id: gymData.id,
        title: gymData.title,
        description: gymData.description,
        latitude: gymData.latitude,
        longitude: gymData.longitude
      }
    }
  }
}
