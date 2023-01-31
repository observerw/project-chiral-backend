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

  createCharacter({ range, ...rest }: CreateCharacterDto) {
    const chara = this.prismaService.character.create({
      data: {
        ...rest,
        ...range.toJSON(),
      },
    })

    return plainToInstance(CharacterEntity, chara)
  }

  getCharacter(id: number) {
    const chara = this.prismaService.character.findFirstOrThrow({
      where: { id },
    })

    return plainToInstance(CharacterEntity, chara)
  }

  updateCharacter(id: number, { range, ...rest }: UpdateCharacterDto) {
    const chara = this.prismaService.character.update({
      where: { id },
      data: {
        ...rest,
        ...range?.toJSON() ?? {},
      },
    })

    return plainToInstance(CharacterEntity, chara)
  }

  removeCharacter(id: number) {
    const chara = this.prismaService.character.delete({
      where: { id },
    })

    return plainToInstance(CharacterEntity, chara)
  }
}
