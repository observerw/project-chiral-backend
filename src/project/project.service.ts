import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { getProjectId, getUserId } from 'src/utils/get-header'
import type { CreateProjectDto } from './dto/create-project.dto'
import type { CreateSettingsDto } from './dto/create-settings.dto'
import type { CreateWorkspaceDto } from './dto/create-workspace.dto'
import type { UpdateProjectDto } from './dto/update-project.dto'
import type { UpdateSettingsDto } from './dto/update-settings.dto'
import type { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { ProjectEntity } from './entities/project.entity'

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

  async updateProject(data: UpdateProjectDto) {
    const id = getProjectId()
    const project = await this.prismaService.project.update({
      where: { id },
      data,
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
        layout: dto.layout as object[],
        projectId,
      },
    })

    return plainToInstance(ProjectEntity, workspace)
  }

  async getWorkspace() {
    const id = getProjectId()

    const workspace = await this.prismaService.project.findUnique({
      where: { id },
    }).workspace()

    return plainToInstance(ProjectEntity, workspace)
  }

  async updateWorkspace(dto: UpdateWorkspaceDto) {
    const id = getProjectId()
  }

  /* -------------------------------- settings -------------------------------- */

  async createSettings(dto: CreateSettingsDto) {
    const id = getProjectId()

    const settings = await this.prismaService.settings.create({
      data: {
        ...dto,
        projectId: id,
      },
    })

    return plainToInstance(ProjectEntity, settings)
  }

  async getSettings() {
    const id = getProjectId()
    const settings = await this.prismaService.project.findUnique({
      where: { id },
    }).settings()

    return plainToInstance(ProjectEntity, settings)
  }

  async updateSettings(dto: UpdateSettingsDto) {
    const projectId = getProjectId()

    const result = await this.prismaService.project.findUnique({
      where: { id: projectId },
      select: { settings: { select: { id: true } } },
    })
  }
}
