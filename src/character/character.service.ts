import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { Redis } from 'ioredis'
import { getProjectId } from 'src/utils/get-header'
import type { CreateCharacterDto } from './dto/create-character.dto'
import type { UpdateCharacterDto } from './dto/update-character.dto'
import { CharacterEntity } from './entities/character.entity'
import { CharaTable } from './const/redis'

@Injectable()
export class CharacterService {
  constructor(
    private prismaService: PrismaService,
    @InjectRedis() private redis: Redis,
  ) {}

  async createCharacter({ range, ...rest }: CreateCharacterDto) {
    const chara = await this.prismaService.character.create({
      data: {
        ...rest,
        ...range.toJSON(),
      },
    })

    await this.updateCharaMap(chara.id, [], [chara.name, ...chara.alias])

    return plainToInstance(CharacterEntity, chara)
  }

  async getCharacter(id: number) {
    const chara = await this.prismaService.character.findFirstOrThrow({
      where: { id },
    })

    return plainToInstance(CharacterEntity, chara)
  }

  async getAllCharacters() {
    const projectId = getProjectId()
    const charas = await this.prismaService.character.findMany({
      where: {
        projects: {
          some: { id: projectId },
        },
      },
    })

    return charas.map(chara => plainToInstance(CharacterEntity, chara))
  }

  async updateCharacter(id: number, { range, ...rest }: UpdateCharacterDto) {
    // TODO 两次查询，没有必要
    const oldChara = await this.prismaService.character.findUniqueOrThrow({
      where: { id },
    })
    const chara = await this.prismaService.character.update({
      where: { id },
      data: {
        ...rest,
        ...range?.toJSON() ?? {},
      },
    })

    await this.updateCharaMap(
      chara.id,
      [oldChara.name, ...oldChara.alias],
      [chara.name, ...chara.alias],
    )

    return plainToInstance(CharacterEntity, chara)
  }

  async removeCharacter(id: number) {
    const chara = await this.prismaService.character.delete({
      where: { id },
    })

    await this.updateCharaMap(chara.id, [chara.name, ...chara.alias], [])

    return plainToInstance(CharacterEntity, chara)
  }

  async searchCharacterByName(text: string) {
    const charas = await this.prismaService.character.findMany({
      where: { name: { contains: text } },
    })

    return charas.map(chara => plainToInstance(CharacterEntity, chara))
  }

  // redis

  async updateCharaMap(id: number, oldNames: string[], newNames: string[]) {
    const projectId = getProjectId()
    await this.redis.hdel(CharaTable(projectId), ...oldNames)
    await this.redis.hmset(CharaTable(projectId), newNames.map(name => [name, id]))
  }

  async checkNameDuplication(name: string) {
    const projectId = getProjectId()
    return await this.redis.hget(CharaTable(projectId), name) !== null
  }
}
