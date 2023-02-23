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
import type { GetAllQueryDto } from './dto/get-all-query.dto'

@Injectable()
export class CharacterService {
  constructor(
    private prismaService: PrismaService,
    @InjectRedis() private redis: Redis,
  ) {}

  async create(dto: CreateCharacterDto) {
    const projectId = getProjectId()
    const chara = await this.prismaService.character.create({
      data: {
        ...dto,
        events: {
          connect: dto.eventIds?.map(id => ({ id })) || [],
        },
        projects: {
          connect: { id: projectId },
        },
      },
    })

    // await this.updateCharaMap(chara.id, [], [chara.name, ...chara.alias])

    return plainToInstance(CharacterEntity, chara)
  }

  async get(id: number) {
    const chara = await this.prismaService.character.findFirstOrThrow({
      where: { id },
    })

    return plainToInstance(CharacterEntity, chara)
  }

  async getAll({ page = 0, size }: GetAllQueryDto) {
    const projectId = getProjectId()
    const charas = await this.prismaService.character.findMany({
      where: {
        projects: {
          some: { id: projectId },
        },
      },
      skip: page * (size ?? 0),
      take: size,
    })

    return charas.map(chara => plainToInstance(CharacterEntity, chara))
  }

  async update(id: number, dto: UpdateCharacterDto) {
    const oldChara = await this.prismaService.character.findUniqueOrThrow({
      where: { id },
    })
    const chara = await this.prismaService.character.update({
      where: { id },
      data: dto,
    })

    // await this.updateCharaMap(
    //   chara.id,
    //   [oldChara.name, ...oldChara.alias],
    //   [chara.name, ...chara.alias],
    // )

    return plainToInstance(CharacterEntity, chara)
  }

  async addAlias(id: number, alias: string) {
    const chara = await this.prismaService.character.update({
      where: { id },
      data: { alias: { push: alias } },
    })

    // await this.updateCharaMap(chara.id, [], [alias])

    return plainToInstance(CharacterEntity, chara)
  }

  async removeAlias(id: number, alias: string) {
    const { alias: oldAlias } = await this.prismaService.character.findUniqueOrThrow({
      where: { id },
      select: { alias: true },
    })
    const chara = await this.prismaService.character.update({
      where: { id },
      data: { alias: oldAlias.filter(a => a !== alias) },
    })

    // await this.updateCharaMap(chara.id, [alias], [])

    return plainToInstance(CharacterEntity, chara)
  }

  async remove(id: number) {
    const chara = await this.prismaService.character.delete({
      where: { id },
    })

    // await this.updateCharaMap(chara.id, [chara.name, ...chara.alias], [])

    return plainToInstance(CharacterEntity, chara)
  }

  async searchByName(text: string) {
    const charas = await this.prismaService.character.findMany({
      where: { name: { contains: text } },
    })

    return charas.map(chara => plainToInstance(CharacterEntity, chara))
  }

  // ---------------------------------- redis ---------------------------------

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
