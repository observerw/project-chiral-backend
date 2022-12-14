import { ApiPropertyOptional } from '@nestjs/swagger'
import { UnitIDRange } from '@project-chiral/unit-system'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmptyObject, IsOptional } from 'class-validator'
import { TransformUnitIDRange } from 'src/common/decorators/transform-unit-id.decorator'

export class GetEventsQueryDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsNotEmptyObject()
  @TransformUnitIDRange()
  range?: UnitIDRange

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  ids?: number[]
}
