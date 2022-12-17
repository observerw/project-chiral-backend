import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { EventType } from '@prisma/client'
import type { Event } from '@prisma/client'
import { Unit, UnitIDRange } from '@project-chiral/unit-system'
import { ExcludeToPlain } from 'src/common/decorators/exclude.decorator'
import ExposeShow from 'src/common/decorators/expose-show.decorator'
import { TransformUnitIDRange } from 'src/common/decorators/transform-unit-id.decorator'

export class EventEntity implements Event {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  contentId: number | null
  projectId: number
  name: string
  description: string | null
  color: string

  @ApiProperty({ enum: EventType })
  type: EventType

  @ExcludeToPlain()
  @ApiHideProperty()
  unit: number

  @ExcludeToPlain()
  @ApiHideProperty()
  start: Date

  @ExcludeToPlain()
  @ApiHideProperty()
  end: Date

  @ExposeShow({ type: String })
  @TransformUnitIDRange()
  get range() {
    return UnitIDRange.fromDayjs(this.start, this.end, Unit.fromOrder(this.unit))
  }
}
