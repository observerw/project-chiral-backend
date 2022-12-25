import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { getProjectId, getUserId } from 'src/utils/get-header'
import type { CreateProjectDto } from './dto/create-project.dto'
import type { CreateSettingsDto } from './dto/create-settings.dto'
import type { CreateWorkspaceDto } from './dto/create-workspace.dto'
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
    const userId = getUserId()
    const project = await this.prismaService.project.create({
      data: {
        ...dto,
        userId,
      },
    })

    return plainToInstance(ProjectEntity, project)
  }

  async updateProject(dto: UpdateProjectDto) {
    const id = getProjectId()
    const project = await this.prismaService.project.update({
      where: { id },
      data: dto,
    })

    return plainToInstance(ProjectEntity, project)
  }

  async getProject() {
    const id = getProjectId()
    const project = await this.prismaService.project.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(ProjectEntity, project)
  }

  async removeProject() {
    const id = getProjectId()
    const project = await this.prismaService.project.delete({
      where: { id },
    })

    return plainToInstance(ProjectEntity, project)
  }

  /* -------------------------------- workspace ------------------------------- */

  async createWorkspace(dto: CreateWorkspaceDto) {
    const projectId = getProjectId()

    const workspace = await this.prismaService.workspace.create({
      data: {
        ...dto,
        // TODO class与prisma JSON Object类型不匹配
        layout: dto.layout as object[],
        projectId,
      },
    })

    return plainToInstance(WorkspaceEntity, workspace)
  }

  async getWorkspace() {
    const projectId = getProjectId()

    const workspace = await this.prismaService.project.findUniqueOrThrow({
      where: { id: projectId },
    }).workspace()

    return plainToInstance(WorkspaceEntity, workspace)
  }

  async updateWorkspace(dto: UpdateWorkspaceDto) {
    const projectId = getProjectId()

    const workspace = await this.prismaService.project.update({
      where: { id: projectId },
      data: {
        workspace: {
          update: {
            ...dto,
            layout: dto.layout as object[],
          },
        },
      },
      select: { workspace: true },
    })

    return plainToInstance(WorkspaceEntity, workspace)
  }

  /* -------------------------------- settings -------------------------------- */

  async createSettings(dto: CreateSettingsDto) {
    const projectId = getProjectId()

    const settings = await this.prismaService.settings.create({
      data: {
        ...dto,
        projectId,
      },
    })

    return plainToInstance(SettingsEntity, settings)
  }

  async getSettings() {
    const projectId = getProjectId()
    const settings = await this.prismaService.project.findUniqueOrThrow({
      where: { id: projectId },
    }).settings()

    return plainToInstance(SettingsEntity, settings)
  }

  async updateSettings(dto: UpdateSettingsDto) {
    const projectId = getProjectId()

    const settings = await this.prismaService.project.update({
      where: { id: projectId },
      data: { settings: { update: dto } },
      select: { settings: true },
    })

    return plainToInstance(SettingsEntity, settings)
  }
}
