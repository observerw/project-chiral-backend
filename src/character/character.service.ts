import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import type { CreateCharacterDto } from './dto/create-character.dto'
import type { UpdateCharacterDto } from './dto/update-character.dto'
import { CharacterEntity } from './entities/character.entity'

@Injectable()
export class CharacterService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async createCharacter({ range, ...rest }: CreateCharacterDto) {
    const chara = await this.prismaService.character.create({
      data: {
        ...rest,
        ...range.toJSON(),
      },
    })

    return plainToInstance(CharacterEntity, chara)
  }

  async getCharacter(id: number) {
    const chara = await this.prismaService.character.findFirstOrThrow({
      where: { id },
    })

    return plainToInstance(CharacterEntity, chara)
  }

  async updateCharacter(id: number, { range, ...rest }: UpdateCharacterDto) {
    const chara = await this.prismaService.character.update({
      where: { id },
      data: {
        ...rest,
        ...range?.toJSON() ?? {},
      },
    })

    return plainToInstance(CharacterEntity, chara)
  }

  async removeCharacter(id: number) {
    const chara = await this.prismaService.character.delete({
      where: { id },
    })

    return plainToInstance(CharacterEntity, chara)
  }

  async searchCharacterByName(text: string) {
    const charas = await this.prismaService.character.findMany({
      where: { name: { contains: text } },
    })

    return charas.map(chara => plainToInstance(CharacterEntity, chara))
  }
}
