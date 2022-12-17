import { PartialType } from '@nestjs/swagger'
import { CreateScenceDto } from './create-scence.dto'

export class UpdateScenceDto extends PartialType(CreateScenceDto) {}
