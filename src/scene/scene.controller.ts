import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { SceneService } from './scene.service'
import { CreateSceneDto } from './dto/create-scene.dto'
import { UpdateSceneDto } from './dto/update-scene.dto'

@Controller('scene')
export class SceneController {
  constructor(private readonly sceneService: SceneService) {}

  @Post()
  createScene(@Body() createSceneDto: CreateSceneDto) {
    return this.sceneService.createScene(createSceneDto)
  }

  @Get(':id')
  getScene(@Param('id') id: number) {
    return this.sceneService.getScene(id)
  }

  @Put(':id')
  updateScene(@Param('id') id: number, @Body() updateSceneDto: UpdateSceneDto) {
    return this.sceneService.updateScene(id, updateSceneDto)
  }

  @Delete(':id')
  removeScene(@Param('id') id: number) {
    return this.sceneService.removeScene(id)
  }

  @Get('search/name')
  searchSceneByName(@Query('text') text: string) {
    return this.sceneService.searchSceneByName(text)
  }
}
