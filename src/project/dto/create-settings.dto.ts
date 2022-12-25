import { Type } from 'class-transformer'
import { IsBoolean } from 'class-validator'

export class CreateSettingsDto {
  @IsBoolean()
  @Type(() => Boolean)
  darkMode: boolean
}
