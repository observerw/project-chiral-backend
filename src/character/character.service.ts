import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { getProjectId } from 'src/utils/get-header'
import { GraphService } from 'src/graph/graph.service'
import { CHARA } from 'test/test'
import type { CreateCharacterDto } from './dto/create-character.dto'
import type { UpdateCharacterDto } from './dto/update-character.dto'
import { CharacterEntity } from './entities/character.entity'
import type { GetAllQueryDto } from './dto/get-all-query.dto'

@Injectable()
export class CharacterService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly graphService: GraphService,
  ) {}

  async get(id: number) {
    const chara = await this.prismaService.character.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(CharacterEntity, chara)
  }

  async getAll({ page = 0, size }: GetAllQueryDto) {
    const projectId = getProjectId()
    const charas = await this.prismaService.character.findMany({
      where: { projectId },
      skip: page * (size ?? 0),
      take: size,
    })

    return charas.map(chara => plainToInstance(CharacterEntity, chara))
  }

  async create(dto: CreateCharacterDto) {
    const projectId = getProjectId()
    const chara = await this.prismaService.character.create({
      data: {
        ...dto,
        projectId,
      },
    })

    await this.graphService.createNode(
      { type: CHARA, id: chara.id },
      dto.name,
    )

    return plainToInstance(CharacterEntity, chara)
  }

  async update(id: number, dto: UpdateCharacterDto) {
    const chara = await this.prismaService.character.update({
      where: { id },
      data: dto,
    })

    return plainToInstance(CharacterEntity, chara)
  }

  async remove(id: number) {
    const chara = await this.prismaService.character.delete({
      where: { id },
    })

    await this.graphService.removeNode({ type: CHARA, id })

    return plainToInstance(CharacterEntity, chara)
  }

  async searchByName(text: string) {
    const charas = await this.prismaService.character.findMany({
      where: {
        OR: [
          { name: { contains: text } },
          { alias: { has: text } },
        ],
      },
    })

    return charas.map(chara => plainToInstance(CharacterEntity, chara))
  }

  async addAlias(id: number, alias: string) {
    const chara = await this.prismaService.character.update({
      where: { id },
      data: {
        alias: { push: alias },
      },
    })

    return plainToInstance(CharacterEntity, chara)
  }

  async removeAlias(id: number, alias: string) {
    // FIXME 两次查询
    const existAlias = (await this.prismaService.character.findUniqueOrThrow({
      where: { id },
      select: { alias: true },
    })).alias

    const chara = await this.prismaService.character.update({
      where: { id },
      data: {
        alias: existAlias.filter(a => a !== alias),
      },
    })

    return plainToInstance(CharacterEntity, chara)
  }
}
