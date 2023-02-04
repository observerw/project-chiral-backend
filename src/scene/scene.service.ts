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

  async createScene(createSceneDto: CreateSceneDto) {
    const scene = await this.prismaService.scene.create({
      data: createSceneDto,
    })

    return plainToInstance(SceneEntity, scene)
  }

  async getScene(id: number) {
    const scene = await this.prismaService.scene.findUnique({
      where: { id },
    })

    return plainToInstance(SceneEntity, scene)
  }

  async updateScene(id: number, { subSceneIds, superSceneId, ...rest }: UpdateSceneDto) {
    const scene = await this.prismaService.scene.update({
      where: { id },
      data: {
        ...rest,
        subs: { connect: subSceneIds?.map(id => ({ id })) ?? [] },
        super: { connect: { id: superSceneId } },
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

  async searchSceneByName(text: string) {
    const scenes = await this.prismaService.scene.findMany({
      where: { name: { contains: text } },
    })

    return scenes.map(scene => plainToInstance(SceneEntity, scene))
  }
}
