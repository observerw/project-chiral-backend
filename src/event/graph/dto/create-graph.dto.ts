import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString } from 'class-validator'

export class CreateGraphDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsArray()
  @Type(() => Number)
  @IsOptional()
  eventIds: number[] = []
}
