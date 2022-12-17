import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import type { Project } from '@prisma/client'
import { SettingsEntity } from './settings.entity'
import { WorkspaceEntity } from './workspace.entity'

export class ProjectEntity implements Project {
  id: number
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  @ApiProperty({ type: SettingsEntity })
  settings: Prisma.JsonValue

  @ApiProperty({ type: WorkspaceEntity })
  workspace: Prisma.JsonValue

  userId: number
}
