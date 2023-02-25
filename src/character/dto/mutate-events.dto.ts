import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'

export class mutateEventsDto {
  @IsInt({ each: true })
  @Type(() => Number)
  events: number[]
}
