import { Type } from 'class-transformer'
import { IsString } from 'class-validator'
import { CreateSettingsDto } from './create-settings.dto'
import { CreateWorkspaceDto } from './create-workspace.dto'

export class CreateProjectDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @Type(() => CreateWorkspaceDto)
  workspace: CreateWorkspaceDto

  @Type(() => CreateSettingsDto)
  settings: CreateSettingsDto
}
