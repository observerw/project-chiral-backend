import { Injectable } from '@nestjs/common'
import type { CreateCharacterDto } from './dto/create-character.dto'
import type { UpdateCharacterDto } from './dto/update-character.dto'

@Injectable()
export class CharacterService {
  create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character'
  }

  findAll() {
    return 'This action returns all character'
  }

  findOne(id: number) {
    return `This action returns a #${id} character`
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`
  }

  remove(id: number) {
    return `This action removes a #${id} character`
  }
}
