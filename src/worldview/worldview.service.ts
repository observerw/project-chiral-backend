import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { getProjectId } from 'src/utils/get-header'
import type { CreateWorldviewDto } from './dto/create-worldview.dto'
import type { UpdateWorldviewDto } from './dto/update-worldview.dto'
import { WorldviewEntity } from './entities/worldview.entity'

@Injectable()
export class WorldviewService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(dto: CreateWorldviewDto) {
    const projectId = getProjectId()
    const worldview = await this.prismaService.worldview.create({
      data: {
        ...dto,
        super: { connect: { id: dto.sup } },
        subs: { connect: dto.subs?.map(id => ({ id })) },
        project: { connect: { id: projectId } },
      },
    })

    return plainToInstance(WorldviewEntity, worldview)
  }

  async get(id: number) {
    const worldview = await this.prismaService.worldview.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(WorldviewEntity, worldview)
  }

  async getAll() {
    const projectId = getProjectId()

    const worldviews = await this.prismaService.worldview.findMany({
      where: { projectId },
    })

    return worldviews.map(v => plainToInstance(WorldviewEntity, v))
  }

  async update(id: number, dto: UpdateWorldviewDto) {
    const worldview = await this.prismaService.worldview.update({
      where: { id },
      data: {
        ...dto,
        super: { connect: { id: dto.sup } },
        subs: { connect: dto.subs?.map(id => ({ id })) },
      },
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
