import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CharacterService } from './character.service'
import { mutateEventsDto } from './dto/mutate-events.dto'
import { CreateCharacterDto } from './dto/create-character.dto'
import { GetAllQueryDto } from './dto/get-all-query.dto'
import { UpdateCharacterDto } from './dto/update-character.dto'

@ApiTags('character')
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get(':id')
  get(@Param('id') id: number) {
    return this.characterService.get(id)
  }

  @Get(':id/detail')
  getDetail(@Param('id') id: number) {
    return this.characterService.getDetail(id)
  }

  @Get('list')
  getAll(@Query() dto: GetAllQueryDto) {
    return this.characterService.getAll(dto)
  }

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.characterService.update(id, updateCharacterDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.characterService.remove(id)
  }

  @Get('search/name')
  searchByName(@Query('text') text: string) {
    return this.characterService.searchByName(text)
  }

  @Put(':id/events')
  addEvents(@Param('id') id: number, @Body() { events }: mutateEventsDto) {
    return this.characterService.connect(id, 'events', events)
  }

  @Delete(':id/events')
  removeEvents(@Param('id') id: number, @Body() { events }: mutateEventsDto) {
    return this.characterService.disconnect(id, 'events', events)
  }
}
