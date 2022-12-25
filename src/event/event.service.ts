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
    const [event, superEvents, superGraphs, subGraphs] = await Promise.all([
      this.getEvent(id),
      this.graphService.getSuperEvents(id),
      this.graphService.getSubGraphs(id),
      this.graphService.getSubGraphs(id),
    ])

    return plainToInstance(EventDetailEntity, {
      ...event,
      superEvents,
      superGraphs,
      subGraphs,
    })
  }

  /**
   * 创建事件
   *
   * 1. 在postgres中创建相应记录
   *
   * 2. 在neo4j中创建相应节点
   *
   * 3. 如果有graphId，则将事件添加到指定的graph中
   */
  async createEvent({ graphId, range, ...rest }: CreateEventDto) {
    const projectId = getProjectId()
    const result = await this.prismaService.event.create({
      data: {
        ...rest,
        ...range.toJSON(),
        projectId,
      },
    })

    await this.cypherService.createNode(['Event'], { eventId: result.id }).run()
    if (graphId) { await this.graphService.addToGraph(result.id, graphId) }

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
    const result = await this.prismaService.event.delete({
      where: { id },
    })

    return plainToInstance(EventEntity, result)
  }

  async createContent(eventId: number, dto: CreateContentDto) {
    const result = this.prismaService.eventContent.create({
      data: {
        ...dto,
        event: { connect: { id: eventId } },
      },
    })

    return plainToInstance(EventContentEntity, result)
  }

  async updateContent(id: number, data: UpdateContentDto) {
    const result = this.prismaService.eventContent.update({
      where: { id },
      data,
    })

    return plainToInstance(EventContentEntity, result)
  }

  async createTodo(eventId: number) {
    // TODO
  }
}
