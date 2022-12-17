import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common/exceptions'
import { ApiTags } from '@nestjs/swagger'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { UpdateSettingsDto } from './dto/update-settings.dto'
import { UpdateWorkspaceDto } from './dto/update-workspace.dto'
import { ProjectService } from './project.service'

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  // --------------------------------- project --------------------------------

  /**
   * 创建新项目
   */
  @Post()
  async createProject(@Body() dto: CreateProjectDto) {
    return this.projectService.createProject(dto)
  }

  /**
   * 获取项目信息
   */
  @Get()
  async getProject() {
    return this.projectService.getProject()
  }

  /**
   * 更新项目信息
   */
  @Put()
  async updateProject(@Body() dto: UpdateProjectDto) {
    return this.projectService.updateProject(dto)
  }

  /**
   * 删除项目
   */
  @Delete()
  async removeProject() {
    return this.projectService.removeProject()
  }

  // -------------------------------- workspace -------------------------------

  /**
   * 获取工作区信息
   */
  @Get('workspace')
  async getWorkspaceInfo() {
    const workspace = await this.projectService.getWorkspace()
    if (workspace === null) { throw new NotFoundException() }
    return workspace
  }

  /**
   * 更新工作区信息
   */
  @Put('workspace')
  async updateWorkspaceInfo(@Body() dto: UpdateWorkspaceDto) {
    return this.projectService.updateWorkspace(dto)
  }

  // -------------------------------- settings --------------------------------

  /**
   * 获取项目设置
   */
  @Get('settings')
  async getProjectSettings() {
    const settings = this.projectService.getSettings()
    if (settings === null) { throw new NotFoundException() }
    return settings
  }

  /**
   * 更新项目设置
   */
  @Put('settings')
  async updateProjectSettings(@Body() dto: UpdateSettingsDto) {
    return this.projectService.updateSettings(dto)
  }
}
