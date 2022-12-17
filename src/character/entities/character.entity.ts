import type { Character } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsArray, IsDate, IsNumber } from 'class-validator'

export class CharacterEntity implements Character {
  id: number
  name: string

  @IsArray()
  alias: string[]

  description: string

  @IsNumber()
  unit: number

  @Type(() => Date)
  @IsDate()
  start: Date

  @Type(() => Date)
  @IsDate()
  end: Date
}
