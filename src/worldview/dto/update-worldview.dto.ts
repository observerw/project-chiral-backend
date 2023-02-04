import { PartialType } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { CreateWorldviewDto } from './create-worldview.dto'

export class UpdateWorldviewDto extends PartialType(CreateWorldviewDto) {
  @IsString()
  @IsOptional()
  content?: string
}
