import { ApiPropertyOptional } from '@nestjs/swagger'
import { UnitIDRange } from '@project-chiral/unit-id'
import { Type } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'
import { TransformUnitIDRange } from 'src/common/decorators/transform-unit-id.decorator'

export class CreateCharacterDto {
  @IsString()
  name: string

  @IsString({ each: true })
  @Type(() => String)
  alias: string[]

  @IsString()
  @IsOptional()
  description: string | null

  @ApiPropertyOptional({ type: String })
  @TransformUnitIDRange()
  @IsOptional()
  range: UnitIDRange
}
