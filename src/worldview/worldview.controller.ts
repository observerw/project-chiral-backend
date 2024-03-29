import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { WorldviewService } from './worldview.service'
import { CreateWorldviewDto } from './dto/create-worldview.dto'
import { UpdateWorldviewDto } from './dto/update-worldview.dto'

@ApiTags('worldview')
@Controller('worldview')
export class WorldviewController {
  constructor(private readonly worldviewService: WorldviewService) {}

  @Post()
  create(@Body() dto: CreateWorldviewDto) {
    return this.worldviewService.create(dto)
  }

  @Get()
  getAll() {
    return this.worldviewService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.worldviewService.get(id)
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() dto: UpdateWorldviewDto) {
    return this.worldviewService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.worldviewService.remove(id)
  }
}
