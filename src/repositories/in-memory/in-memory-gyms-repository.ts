import { type CreateGym, type Gyms, type GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  private readonly gyms: Gyms[] = []

  async findById (id: string): Promise<Gyms | null> {
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

  async create (data: CreateGym): Promise<Gyms> {
    const gym = {
      id: data.id ?? this.gyms.length.toString(),
      title: data.title,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude
    }

    this.gyms.push(gym)

    return gym
  }
}
