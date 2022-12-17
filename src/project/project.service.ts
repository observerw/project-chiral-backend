import { Injectable } from '@nestjs/common'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { getNumberHeader } from 'src/utils/get-header'
import type { CreateProjectDto } from './dto/create-project.dto'
import type { UpdateProjectDto } from './dto/update-project.dto'
import type { UpdateSettingsDto } from './dto/update-settings.dto'
import type { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { ProjectEntity } from './entities/project.entity'
import { SettingsEntity } from './entities/settings.entity'
import { WorkspaceEntity } from './entities/workspace.entity'

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  /* --------------------------------- project -------------------------------- */

  async createProject(dto: CreateProjectDto) {
    const userId = getNumberHeader('user-id')
    const result = await this.prismaService.project.create({
      data: {
        ...dto,
        userId,
      },
    })

    return plainToInstance(ProjectEntity, result)
  }

  async updateProject(data: UpdateProjectDto) {
    const id = getNumberHeader('project-id')
    const result = await this.prismaService.project.update({
      where: { id },
      data,
    })

    return plainToInstance(ProjectEntity, result)
  }

  async getProject() {
    const id = getNumberHeader('project-id')
    const result = await this.prismaService.project.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(ProjectEntity, result)
  }

  async removeProject() {
    const id = getNumberHeader('project-id')
    const result = await this.prismaService.project.delete({
      where: { id },
    })

    return plainToInstance(ProjectEntity, result)
  }

  /* -------------------------------- workspace ------------------------------- */

  async getWorkspace() {
    const id = getNumberHeader('project-id')
    const { workspace } = await this.prismaService.project.findUniqueOrThrow({
      where: { id },
      select: { workspace: true },
    })

    if (workspace === null) { return null }
    return plainToInstance(WorkspaceEntity, workspace)
  }

  async updateWorkspace(dto: UpdateWorkspaceDto) {
    const id = getNumberHeader('project-id')
    const { workspace } = await this.prismaService.project.update({
      where: { id },
      data: {
        workspace: instanceToPlain(dto),
      },
    })

    return plainToInstance(WorkspaceEntity, workspace)
  }

  /* -------------------------------- settings -------------------------------- */

  async getSettings() {
    const id = getNumberHeader('project-id')
    const { settings } = await this.prismaService.project.findUniqueOrThrow({
      where: { id },
      select: { settings: true },
    })

    if (settings === null) { return null }
    return plainToInstance(SettingsEntity, settings)
  }

  async updateSettings(dto: UpdateSettingsDto) {
    const id = getNumberHeader('project-id')
    const { settings } = await this.prismaService.project.update({
      where: { id },
      data: {
        settings: instanceToPlain(dto),
      },
    })

    return plainToInstance(SettingsEntity, settings)
  }
}
