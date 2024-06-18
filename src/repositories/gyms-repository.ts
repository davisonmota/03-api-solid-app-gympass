export interface Gyms {
  id: string
  title: string
  description?: string
  latitude: number
  longitude: number
}

export interface CreateGym {
  id?: string
  title: string
  description?: string
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gyms | null>
  create(data: CreateGym): Promise<Gyms>
}
