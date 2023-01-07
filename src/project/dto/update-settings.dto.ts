import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class UpdateSettingsDto {
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  darkMode?: boolean
}
