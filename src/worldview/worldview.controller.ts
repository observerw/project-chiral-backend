import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { WorldviewService } from './worldview.service'
import { CreateWorldviewDto } from './dto/create-worldview.dto'
import { UpdateWorldviewDto } from './dto/update-worldview.dto'

@Controller('worldview')
export class WorldviewController {
  constructor(private readonly worldviewService: WorldviewService) {}

  @Post()
  createWorldview(@Body() dto: CreateWorldviewDto) {
    return this.worldviewService.createWorldview(dto)
  }

  @Get(':id')
  getWorldview(@Param('id') id: number) {
    return this.worldviewService.getWorldview(+id)
  }

  @Post(':id')
  updateWorldview(@Param('id') id: number, @Body() dto: UpdateWorldviewDto) {
    return this.worldviewService.updateWorldview(id, dto)
  }

  @Delete(':id')
  removeWorldview(@Param('id') id: number) {
    return this.worldviewService.removeWorldview(id)
  }
}
