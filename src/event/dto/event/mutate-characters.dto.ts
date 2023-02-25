import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class MutateCharactersDto {
  @IsInt({ each: true })
  @Type(() => Number)
  characters: number[]
}
