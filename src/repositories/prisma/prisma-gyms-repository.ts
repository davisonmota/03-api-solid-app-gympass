import { prisma } from '@/lib/prisma'
import { type Gym as GymPrismaType } from '@prisma/client'
import { type Coordinate, type CreateGym, type Gym, type GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async findById (id: string): Promise<Gym | null> {
    const gymData = await prisma.gym.findUnique({
      where: {
        id
      }
    })

    if (!gymData) return null

    return {
      id: gymData.id,
      title: gymData.title,
      description: gymData.description,
      latitude: gymData.latitude.toNumber(),
      longitude: gymData.longitude.toNumber()
    }
  }

  async create (data: CreateGym): Promise<Gym> {
    const gymData = await prisma.gym.create({
      data
    })

    return {
      id: gymData.id,
      title: gymData.title,
      description: gymData.description,
      latitude: gymData.latitude.toNumber(),
      longitude: gymData.longitude.toNumber()
    }
  }

  async searchManyBy (query: string, page: number): Promise<Gym[]> {
    const gymsData = await prisma.gym.findMany({
      where: {
        title: {
          contains: query
        }
      },
      take: 20,
      skip: (page - 1) * 20
    })

    const gyms = gymsData.map(gymData => {
      return {
        id: gymData.id,
        title: gymData.title,
        description: gymData.description,
        latitude: gymData.latitude.toNumber(),
        longitude: gymData.longitude.toNumber()
      }
    })

    return gyms
  }

  async findManyNearby ({ latitude, longitude }: Coordinate): Promise<Gym[]> {
    const gymsData: GymPrismaType[] = await prisma.$queryRaw`
      SELECT * from gyms
        WHERE ( 6371 * 
          acos( cos( radians(${latitude}) ) * 
            cos( radians( latitude ) ) * 
            cos( radians( longitude ) - radians(${longitude}) ) + 
            sin( radians(${latitude}) ) * sin( radians( latitude ) ) 
          ) 
        ) <= 10
    `

    const gyms: Gym[] = gymsData.map(gymData => {
      return {
        id: gymData.id,
        title: gymData.title,
        description: gymData.description,
        latitude: gymData.latitude.toNumber(),
        longitude: gymData.longitude.toNumber()
      }
    })

    return gyms
  }
}
