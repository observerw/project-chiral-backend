import type { Character } from '@prisma/client'
import { Unit, UnitIDRange } from '@project-chiral/unit-id'
import ExposeShow from 'src/common/decorators/expose-show.decorator'

export class CharacterEntity implements Character {
  id: number
  name: string
  alias: string[]
  description: string

  deleted: Date | null

  unit: number
  start: Date
  end: Date
  @ExposeShow({ type: String })
  range() {
    return UnitIDRange.fromDayjs(this.start, this.end, Unit.fromOrder(this.unit)).serialize()
  }
}
