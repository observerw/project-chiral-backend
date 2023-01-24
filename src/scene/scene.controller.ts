import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { SceneService } from './scene.service'
import { CreateSceneDto } from './dto/create-scene.dto'
import { UpdateSceneDto } from './dto/update-scene.dto'

@Controller('scene')
export class SceneController {
  constructor(private readonly sceneService: SceneService) {}

  @Post()
  create(@Body() createSceneDto: CreateSceneDto) {
    return this.sceneService.create(createSceneDto)
  }

  @Get()
  findAll() {
    return this.sceneService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sceneService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSceneDto: UpdateSceneDto) {
    return this.sceneService.update(+id, updateSceneDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sceneService.remove(+id)
  }
}
