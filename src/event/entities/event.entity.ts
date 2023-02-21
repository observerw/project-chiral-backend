import { ApiProperty } from '@nestjs/swagger'
import { EventType } from '@prisma/client'
import type { Event } from '@prisma/client'
import { UnitIDRange } from '@project-chiral/unit-id'
import ExposeShow from 'src/common/decorators/expose-show.decorator'

export class EventEntity implements Event {
  id: number
  name: string
  description: string | null
  color: string
  serial: number

  @ApiProperty({ enum: EventType })
  type: EventType

  createdAt: Date
  updatedAt: Date

  deleted: Date | null

  unit: number
  start: Date
  end: Date
  @ExposeShow({ type: String })
  range() {
    return UnitIDRange.fromDayjs(this.unit, this.start, this.end).serialize()
  }

  contentId: number | null
  projectId: number
}
