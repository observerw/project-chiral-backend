import { PartialType } from '@nestjs/swagger'
import { CreateBackdropDto } from './create-backdrop.dto'

export class UpdateBackdropDto extends PartialType(CreateBackdropDto) {}
