export interface CreateCheckIn {
  userId: string
  gymId: string
}

export interface CheckIn {
  id: string
  userId: string
  gymId: string
  validatedAt: Date | null
  createdAt: Date
}

export interface CheckInRepository {
  create(data: CreateCheckIn): Promise<CheckIn>
}
