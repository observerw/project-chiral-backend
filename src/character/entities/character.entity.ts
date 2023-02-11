import type { Character } from '@prisma/client'
import { Unit, UnitIDRange } from '@project-chiral/unit-id'
import ExposeShow from 'src/common/decorators/expose-show.decorator'

export class CharacterEntity implements Character {
  id: number
  name: string
  alias: string[]
  description: string | null
  avatar: string | null

  deleted: Date | null

  unit: number | null
  start: Date | null
  end: Date | null
  @ExposeShow({ type: String, required: false })
  range() {
    if (this.unit === null || this.start === null || this.end === null) { return null }
    return UnitIDRange.fromDayjs(this.start, this.end, Unit.fromOrder(this.unit)).serialize()
  }
}
