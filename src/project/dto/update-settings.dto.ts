import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class UpdateSettingsDto {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  darkMode?: boolean
}
