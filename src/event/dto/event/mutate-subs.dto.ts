import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class MutateSubsDto {
  @IsInt({ each: true })
  @Type(() => Number)
  subs: number[]
}
