import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import type { CreateSceneDto } from './dto/create-scene.dto'
import type { UpdateSceneDto } from './dto/update-scene.dto'
import { SceneEntity } from './entities/scene.entity'

@Injectable()
export class SceneService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async get(id: number) {
    const scene = await this.prismaService.scene.findUnique({
      where: { id },
    })

    return plainToInstance(SceneEntity, scene)
  }

  async create({ events, sup, subs, ...rest }: CreateSceneDto) {
    const scene = await this.prismaService.scene.create({
      data: {
        ...rest,
        super: { connect: { id: sup } },
        subs: { connect: subs?.map(id => ({ id })) },
        events: { connect: events?.map(id => ({ id })) },
      },
    })

    return plainToInstance(SceneEntity, scene)
  }

  async update(id: number, { events, sup, subs, ...rest }: UpdateSceneDto) {
    const scene = await this.prismaService.scene.update({
      where: { id },
      data: {
        ...rest,
        super: { connect: { id: sup } },
        subs: { connect: subs?.map(id => ({ id })) },
        events: { connect: events?.map(id => ({ id })) },
      },
    })

    return plainToInstance(SceneEntity, scene)
  }

  async removeScene(id: number) {
    const scene = await this.prismaService.scene.delete({
      where: { id },
    })

    return plainToInstance(SceneEntity, scene)
  }

  async searchByName(text: string) {
    const scenes = await this.prismaService.scene.findMany({
      where: { name: { contains: text } },
    })

    return scenes.map(scene => plainToInstance(SceneEntity, scene))
  }
}
