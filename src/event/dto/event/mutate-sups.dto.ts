import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class MutateSupsDto {
  @IsInt({ each: true })
  @Type(() => Number)
  sups: number[]
}
