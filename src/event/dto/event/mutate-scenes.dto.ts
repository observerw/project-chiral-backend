import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class MutateScenesDto {
  @IsInt({ each: true })
  @Type(() => Number)
  scenes: number[]
}
