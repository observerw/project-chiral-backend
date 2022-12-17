import { Type } from 'class-transformer'

export class SettingsEntity {
  @Type(() => Boolean)
  darkMode: boolean
}
