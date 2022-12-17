import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { BackdropService } from './backdrop.service'
import { CreateBackdropDto } from './dto/create-backdrop.dto'
import { UpdateBackdropDto } from './dto/update-backdrop.dto'

@Controller('backdrop')
export class BackdropController {
  constructor(private readonly backdropService: BackdropService) {}

  @Post()
  create(@Body() createBackdropDto: CreateBackdropDto) {
    return this.backdropService.create(createBackdropDto)
  }

  @Get()
  findAll() {
    return this.backdropService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.backdropService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBackdropDto: UpdateBackdropDto) {
    return this.backdropService.update(+id, updateBackdropDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.backdropService.remove(+id)
  }
}
