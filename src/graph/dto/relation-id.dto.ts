import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt } from 'class-validator'
import { RelationEnum, RelationType } from '../schema'

export class RelationIdDto {
  @IsInt()
  from: number

  @IsInt()
  to: number

  @IsEnum(RelationEnum)
  @ApiProperty({ enum: RelationEnum })
  type: RelationType
}
