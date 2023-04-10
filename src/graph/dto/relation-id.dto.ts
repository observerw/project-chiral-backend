import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsOptional } from 'class-validator'
import { RelationEnum, RelationType } from '../schema'

export class RelationIdDto {
  @IsInt()
  @IsOptional()
  from?: number

  @IsInt()
  @IsOptional()
  to?: number

  @IsEnum(RelationEnum)
  @ApiProperty({ enum: RelationEnum })
  type: RelationType
}
