import { Type } from 'class-transformer'
import { EventEntity } from './event.entity'

export class EventDetailEntity extends EventEntity {
  @Type(() => EventEntity)
  superEvents: EventEntity[]

  @Type(() => EventEntity)
  subEvents: EventEntity[]

  brief?: string
}
