import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import type { CreateWorldviewDto } from './dto/create-worldview.dto'
import type { UpdateWorldviewDto } from './dto/update-worldview.dto'
import { WorldviewEntity } from './entities/worldview.entity'

@Injectable()
export class WorldviewService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async createWorldview(dto: CreateWorldviewDto) {
    const worldview = await this.prismaService.worldview.create({
      data: dto,
    })

    return plainToInstance(WorldviewEntity, worldview)
  }

  async get(id: number) {
    const worldview = await this.prismaService.worldview.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(WorldviewEntity, worldview)
  }

  async update(id: number, dto: UpdateWorldviewDto) {
    const worldview = await this.prismaService.worldview.update({
      where: { id },
      data: dto,
    })

    return plainToInstance(WorldviewEntity, worldview)
  }

  async remove(id: number) {
    const worldview = await this.prismaService.worldview.delete({
      where: { id },
    })

    return plainToInstance(WorldviewEntity, worldview)
  }
}
