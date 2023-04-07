import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class GetBatchDto {
  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[]
}
