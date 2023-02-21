import { ApiProperty } from '@nestjs/swagger'
import { EventType } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsHexColor, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator'

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description: string | null

  @IsHexColor()
  color: string

  @IsEnum(EventType)
  @ApiProperty({ enum: EventType })
  type: EventType

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
}
