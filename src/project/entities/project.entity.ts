import type { Project } from '@prisma/client'

export class ProjectEntity implements Project {
  id: number
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  userId: number
  serial: number
}
