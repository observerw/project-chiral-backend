import { ApiProperty } from '@nestjs/swagger'
import { EventType } from '@prisma/client'
import { UnitIDRange } from '@project-chiral/unit-id'
import { IsEnum, IsHexColor, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString } from 'class-validator'
import { TransformUnitIDRange } from 'src/common/decorators/transform-unit-id.decorator'

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description: string | null

  @IsHexColor()
  @IsOptional()
  color?: string = '#93c5fd'

  @IsEnum(EventType)
  @ApiProperty({ enum: EventType })
  type: EventType

  @ApiProperty({ type: String })
  @IsNotEmptyObject()
  @TransformUnitIDRange()
  range: UnitIDRange
}
