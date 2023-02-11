import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { CharacterService } from './character.service'
import { CreateCharacterDto } from './dto/create-character.dto'

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  createCharacter(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.createCharacter(createCharacterDto)
  }

  @Get(':id')
  getCharacter(@Param('id') id: number) {
    return this.characterService.getCharacter(id)
  }

  @Get()
  getAllCharacters() {
    return this.characterService.getAllCharacters()
  }

  @Put(':id')
  updateCharacter(@Param('id') id: number, @Body() updateCharacterDto: CreateCharacterDto) {
    return this.characterService.updateCharacter(id, updateCharacterDto)
  }

  @Delete(':id')
  removeCharacter(@Param('id') id: number) {
    return this.characterService.removeCharacter(id)
  }

  @Get('search/name')
  searchCharacterByName(@Query('text') text: string) {
    return this.characterService.searchCharacterByName(text)
  }
}
