import { Injectable, NotFoundException } from '@nestjs/common'
import type { UnitIDRange } from '@project-chiral/unit-system'
import { plainToInstance } from 'class-transformer'
import { CypherService } from 'src/database/cypher/cypher.service'
import { PrismaService } from 'nestjs-prisma'
import { getProjectId } from 'src/utils/get-header'
import type { CreateContentDto } from './dto/content/create-content.dto'
import type { UpdateContentDto } from './dto/content/update-content.dto'
import type { CreateEventDto } from './dto/event/create-event.dto'
import type { UpdateEventDto } from './dto/event/update-event.dto'
import { EventContentEntity } from './entities/event-content.entity'
import { EventDetailEntity } from './entities/event-detail.entity'
import { EventEntity } from './entities/event.entity'
import { GraphService } from './graph/graph.service'

@Injectable()
export class EventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cypherService: CypherService,
    private readonly graphService: GraphService,
  ) {}

  async getEvent(id: number) {
    const event = await this.prismaService.event.findUnique({
      where: { id },
    })

    if (event === null) { throw new NotFoundException(id) }

    return plainToInstance(EventEntity, event)
  }

  /**
   * 根据时间范围或给定id列表获取事件，将二者的并集返回
   * @param range 事件发生的时间范围
   * @param ids 事件的id列表
   */
  async getEvents(range?: UnitIDRange, ids?: number[]) {
    const { unit, start, end } = range?.toJSON() ?? {}
    const results = await this.prismaService.event.findMany({
      where: {
        OR: [
          {
            id: { in: ids },
          },
          {
            unit: { gt: unit },
            start: { gte: start, lte: end },
          },
        ],
      },
    })

    return results.map(v => plainToInstance(EventEntity, v))
  }

  async getEventDetail(id: number) {
    const [event, superEventNodes, subEventNodes] = await Promise.all([
      this.getEvent(id),
      this.graphService.getSuperEvents(id),
      this.graphService.getSubEvents(id),
    ])

    const [superEvents, subEvents] = await Promise.all([
      this.prismaService.event.findMany({
        where: { id: { in: superEventNodes.map(v => v.properties.id) } },
      }),
      this.prismaService.event.findMany({
        where: { id: { in: subEventNodes.map(v => v.properties.id) } },
      }),
    ])

    const { content } = await this.prismaService.event.findUniqueOrThrow({
      where: { id },
      select: { content: true },
    })

    const brief = content?.content.substring(0, 100) ?? undefined

    return plainToInstance(EventDetailEntity, {
      ...event,
      superEvents,
      subEvents,
      brief,
    })
  }

  async createEvent({ range, ...rest }: CreateEventDto) {
    const projectId = getProjectId()

    // 生成事件序号
    const { serial } = await this.prismaService.project.update({
      where: { id: projectId },
      data: { serial: { increment: 1 } },
      select: { serial: true },
    })

    const result = await this.prismaService.event.create({
      data: {
        ...rest,
        ...range.toJSON(),
        projectId,
        serial,
      },
    })

    await this.graphService.createEvent(result.id)

    return plainToInstance(EventEntity, result)
  }

  async updateEvent(id: number, { range, ...rest }: UpdateEventDto) {
    const result = await this.prismaService.event.update({
      where: { id },
      data: {
        ...rest,
        ...range?.toJSON(),
      },
    })

    return plainToInstance(EventEntity, result)
  }

  async removeEvent(id: number) {
    const [result] = await Promise.all([
      this.prismaService.event.delete({
        where: { id },
      }),
      this.graphService.removeEvent(id),
    ])

    return plainToInstance(EventEntity, result)
  }

  async createContent(eventId: number, dto: CreateContentDto) {
    const result = this.prismaService.eventContent.create({
      data: {
        ...dto,
        eventId,
      },
    })

    return plainToInstance(EventContentEntity, result)
  }

  async getContent(eventId: number) {
    const { content } = await this.prismaService.event.findUniqueOrThrow({
      where: { id: eventId },
      select: { content: true },
    })

    // 如果没有内容则在第一次获取时创建
    if (content === null) {
      const createdContent = await this.createContent(eventId, { content: '' })
      return plainToInstance(EventContentEntity, createdContent)
    }

    return plainToInstance(EventContentEntity, content)
  }

  async updateContent(eventId: number, dto: UpdateContentDto) {
    const { content } = this.prismaService.event.update({
      where: { id: eventId },
      data: {
        content: {
          update: {
            ...dto,
          },
        },
      },
      select: { content: true },
    })

    return plainToInstance(EventContentEntity, content)
  }

  async createTodo(eventId: number) {
    // TODO
  }
}
