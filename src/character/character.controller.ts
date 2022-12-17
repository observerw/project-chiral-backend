import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { CharacterService } from './character.service'
import { CreateCharacterDto } from './dto/create-character.dto'
import { UpdateCharacterDto } from './dto/update-character.dto'

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto)
  }

  @Get()
  findAll() {
    return this.characterService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.characterService.update(+id, updateCharacterDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterService.remove(+id)
  }
}
