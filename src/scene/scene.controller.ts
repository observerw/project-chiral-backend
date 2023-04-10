import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { SceneService } from './scene.service'
import { CreateSceneDto } from './dto/create-scene.dto'
import { UpdateSceneDto } from './dto/update-scene.dto'

@ApiTags('scene')
@Controller('scene')
export class SceneController {
  constructor(private readonly sceneService: SceneService) {}

  @Post()
  create(@Body() createSceneDto: CreateSceneDto) {
    return this.sceneService.create(createSceneDto)
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.sceneService.get(id)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateSceneDto: UpdateSceneDto) {
    return this.sceneService.update(id, updateSceneDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sceneService.removeScene(id)
  }

  @Get('search/name')
  searchByName(@Query('text') text: string) {
    return this.sceneService.searchByName(text)
  }
}
