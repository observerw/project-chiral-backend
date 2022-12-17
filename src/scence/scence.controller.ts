import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ScenceService } from './scence.service'
import { CreateScenceDto } from './dto/create-scence.dto'
import { UpdateScenceDto } from './dto/update-scence.dto'

@Controller('scence')
export class ScenceController {
  constructor(private readonly scenceService: ScenceService) {}

  @Post()
  create(@Body() createScenceDto: CreateScenceDto) {
    return this.scenceService.create(createScenceDto)
  }

  @Get()
  findAll() {
    return this.scenceService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scenceService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScenceDto: UpdateScenceDto) {
    return this.scenceService.update(+id, updateScenceDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scenceService.remove(+id)
  }
}
