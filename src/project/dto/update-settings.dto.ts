import { PartialType } from '@nestjs/swagger'
import { CreateSettingsDto } from './create-settings.dto'

export class UpdateSettingsDto extends PartialType(CreateSettingsDto) {}
