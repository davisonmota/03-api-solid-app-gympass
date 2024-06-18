import { type CreateGym, type Gym, type GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  private readonly gyms: Gym[] = []

  async findById (id: string): Promise<Gym | null> {
    const gymData = this.gyms.find(gym => gym.id === id)
    if (!gymData) return null

    return {
      id: gymData.id,
      title: gymData.title,
      description: gymData.description,
      latitude: gymData.latitude,
      longitude: gymData.longitude
    }
  }

  async create (data: CreateGym): Promise<Gym> {
    const gym = {
      id: data.id ?? this.gyms.length.toString(),
      title: data.title,
      description: data.description ?? null,
      latitude: data.latitude,
      longitude: data.longitude
    }
    this.gyms.push(gym)
    return gym
  }
}
