import type { EventContent } from '@prisma/client'

export class EventContentEntity implements EventContent {
  id: number
  updatedAt: Date
  content: string

  eventId: number
}
