import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinate'
import { type Coordinate, type CreateGym, type Gym, type GymsRepository } from '../gyms-repository'

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

  async searchManyBy (query: string, page: number): Promise<Gym[]> {
    const searchMany = this.gyms
      .filter(gym => {
        const titleToLowerCase = gym.title.toLowerCase()
        const queryToLowerCase = query.toLowerCase()
        const isSubString = titleToLowerCase.indexOf(queryToLowerCase)
        return isSubString !== -1
      })
      .slice((page - 1) * 20, page * 20)

    return searchMany
  }

  async findManyNearby (coordinate: Coordinate): Promise<Gym[]> {
    return this.gyms.filter(gym => {
      const distance = getDistanceBetweenCoordinates({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude
      }, {
        latitude: gym.latitude,
        longitude: gym.longitude
      })
      return distance <= 10 // 10 Kilometro de distancia
    })
  }
}
