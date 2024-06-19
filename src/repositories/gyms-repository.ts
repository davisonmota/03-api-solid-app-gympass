export interface Gym {
  id: string
  title: string
  description: string | null
  latitude: number
  longitude: number
}

export interface CreateGym {
  id?: string
  title: string
  description?: string | null
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: CreateGym): Promise<Gym>
  searchManyBy(data: string, page: number): Promise<Gym[]>
}
