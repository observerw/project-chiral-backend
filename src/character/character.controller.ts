import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { CharacterService } from './character.service'
import { CreateCharacterDto } from './dto/create-character.dto'

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto)
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.characterService.get(id)
  }

  @Get()
  getAll() {
    return this.characterService.getAll()
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCharacterDto: CreateCharacterDto) {
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
}
