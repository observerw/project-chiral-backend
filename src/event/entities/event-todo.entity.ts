import type { EventTodo } from '@prisma/client'

export class EventTodoEntity implements EventTodo {
  id: number
  eventId: number
  name: string
  content: string
  type: string | null
  done: boolean
}
