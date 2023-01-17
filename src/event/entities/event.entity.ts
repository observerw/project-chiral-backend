import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { EventType } from '@prisma/client'
import type { Event } from '@prisma/client'
import { Unit, UnitIDRange } from '@project-chiral/unit-id'
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
  deletedAt: Date | null

  @ApiHideProperty()
  unit: number

  @ApiHideProperty()
  start: Date

  @ApiHideProperty()
  end: Date

  @ExposeShow({ type: String })
  range() {
    return UnitIDRange.fromDayjs(this.start, this.end, Unit.fromOrder(this.unit)).serialize()
  }

  contentId: number | null
  projectId: number
}
