import { ApiProperty } from '@nestjs/swagger'
import { UnitIDRange } from '@project-chiral/unit-id'
import { IsNotEmptyObject } from 'class-validator'
import { TransformUnitIDRange } from 'src/common/decorators/transform-unit-id.decorator'

export class GetEventsQueryDto {
  @ApiProperty({ type: String })
  @IsNotEmptyObject()
  @TransformUnitIDRange()
  range: UnitIDRange
}
