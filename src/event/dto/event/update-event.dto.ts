import { PartialType } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { CreateEventDto } from './create-event.dto'

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsBoolean()
  @IsOptional()
  done?: boolean

  @IsString()
  @IsOptional()
  unresolved?: string
}
