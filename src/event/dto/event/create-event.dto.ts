import { Type } from 'class-transformer'
import { IsDate, IsHexColor, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator'

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description: string | null

  @IsHexColor()
  color: string

  @IsInt()
  @Min(0)
  @Max(8)
  @Type(() => Number)
  unit: number

  @IsDate()
  @Type(() => Date)
  start: Date

  @IsDate()
  @Type(() => Date)
  end: Date

  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  characters?: number[]

  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  scenes?: number[]

  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  sups?: number[]

  @IsInt({ each: true })
  @Type(() => Number)
  @IsOptional()
  subs?: number[]
}
