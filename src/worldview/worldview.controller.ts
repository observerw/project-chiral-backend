import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { WorldviewService } from './worldview.service'
import { CreateWorldviewDto } from './dto/create-worldview.dto'
import { UpdateWorldviewDto } from './dto/update-worldview.dto'

@Controller('worldview')
export class WorldviewController {
  constructor(private readonly worldviewService: WorldviewService) {}

  @Post()
  create(@Body() createWorldviewDto: CreateWorldviewDto) {
    return this.worldviewService.create(createWorldviewDto)
  }

  @Get()
  findAll() {
    return this.worldviewService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.worldviewService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorldviewDto: UpdateWorldviewDto) {
    return this.worldviewService.update(+id, updateWorldviewDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.worldviewService.remove(+id)
  }
}
