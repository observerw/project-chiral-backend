import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { getProjectId } from 'src/utils/get-header'
import { GraphService } from 'src/graph/graph.service'
import { EVENT } from 'src/graph/schema'
import { AmqpConnection } from '@nestjs-plus/rabbitmq'
import type { UpdateContentDto } from './dto/content/update-content.dto'
import type { CreateEventDto } from './dto/event/create-event.dto'
import type { UpdateEventDto } from './dto/event/update-event.dto'
import { EventContentEntity } from './entities/event-content.entity'
import { EventEntity } from './entities/event.entity'
import { EventTodoEntity } from './entities/event-todo.entity'
import type { CreateTodoDto } from './dto/todo/create-todo.dto'
import type { UpdateTodoDto } from './dto/todo/update-todo.dto'
import type { GetAllEventQueryDto } from './dto/event/get-all-event-query-dto'

@Injectable()
export class EventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly graphService: GraphService,
    private readonly rmq: AmqpConnection,
  ) {}

  // ---------------------------------- event ---------------------------------

  async get(id: number) {
    const event = await this.prismaService.event.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(EventEntity, event)
  }

  async getBatch(ids: number[]) {
    const events = await this.prismaService.event.findMany({
      where: { id: { in: ids } },
    })

    return events.map(v => plainToInstance(EventEntity, v))
  }

  async getAll({ size, page = 0 }: GetAllEventQueryDto) {
    const projectId = getProjectId()
    const results = await this.prismaService.event.findMany({
      where: { projectId },
      skip: (size ?? 0) * page,
      take: size,
    })

    return results.map(v => plainToInstance(EventEntity, v))
  }

  /**
   * 根据时间范围或给定id列表获取事件，将二者的并集返回
   * @param range 事件发生的时间范围
   * @param ids 事件的id列表
   */
  async getByRange(unit: number, start: Date, end: Date) {
    const projectId = getProjectId()
    const results = await this.prismaService.event.findMany({
      where: {
        unit,
        // 事件时间范围与查询时间范围有交集
        start: { lte: end },
        end: { gte: start },
        projectId,
      },
    })
    return results.map(v => plainToInstance(EventEntity, v))
  }

  async getBySerial(serial: number) {
    const projectId = getProjectId()
    const event = await this.prismaService.event.findUniqueOrThrow({
      where: { serial_projectId: { serial, projectId } },
    })

    return plainToInstance(EventEntity, event)
  }

  async searchByName(text: string) {
    if (text === '') { return [] }
    const serial = parseInt(text)
    const events = await this.prismaService.event.findMany({
      where: {
        OR: [
          { serial: isNaN(serial) ? -1 : serial },
          { name: { contains: text } },
        ],
      },
    })

    return events.map(v => plainToInstance(EventEntity, v))
  }

  async create(dto: CreateEventDto) {
    const projectId = getProjectId()

    // 生成事件序号
    const { serial } = await this.prismaService.project.update({
      where: { id: projectId },
      data: { serial: { increment: 1 } },
      select: { serial: true },
    })

    const result = await this.prismaService.event.create({
      data: {
        ...dto,
        projectId,
        serial,
        content: { create: {} },
      },
    })

    await this.graphService.createNode(
      { type: EVENT, id: result.id },
      `${result.serial}. ${result.name}`,
    )

    return plainToInstance(EventEntity, result)
  }

  async update(id: number, dto: UpdateEventDto) {
    const result = await this.prismaService.event.update({
      where: { id },
      data: dto,
    })

    if (dto.done !== undefined) {
      this.rmq.publish('', 'event-done', { done: dto.done, id })
    }

    return plainToInstance(EventEntity, result)
  }

  async remove(id: number) {
    // TODO 软删除
    const result = await this.prismaService.event.delete({
      where: { id },
    })

    await this.graphService.removeNode({ type: EVENT, id })

    return plainToInstance(EventEntity, result)
  }

  // ---------------------------------- content ---------------------------------

  async getContent(eventId: number) {
    // 优先走缓存
    // const cache = await this.redis.get(EventContent(eventId))
    // if (cache) {
    //   const content = JSON.parse(cache) as EventContentEntity
    //   return plainToInstance(EventContentEntity, content)
    // }

    const { content } = await this.prismaService.event.findUniqueOrThrow({
      where: { id: eventId },
      select: { content: true },
    })

    return plainToInstance(EventContentEntity, content)
  }

  async updateContent(eventId: number, dto: UpdateContentDto) {
    const { content } = await this.prismaService.event.update({
      where: { id: eventId },
      data: {
        content: {
          update: dto,
        },
      },
      select: { content: true },
    })

    return plainToInstance(EventContentEntity, content)
  }

  async searchContent(text: string) {
    if (text === '') { return [] }
    // TODO 全文搜索按词索引，但有可能需要按片段索引
    const events = await this.prismaService.event.findMany({
      where: {
        content: {
          content: {
            contains: text.replace(/\s+/, ' & '),
          },
        },
      },
    })

    return events.map(v => plainToInstance(EventEntity, v))
  }

  // ---------------------------------- todo ---------------------------------

  async getTodos(eventId: number) {
    const { todos } = await this.prismaService.event.findUniqueOrThrow({
      where: { id: eventId },
      include: { todos: true },
    })

    return todos.map(v => plainToInstance(EventTodoEntity, v))
  }

  async getTodo(id: number) {
    const todo = await this.prismaService.eventTodo.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(EventTodoEntity, todo)
  }

  async createTodo(eventId: number, dto: CreateTodoDto) {
    const todo = await this.prismaService.eventTodo.create({
      data: {
        ...dto,
        eventId,
      },
    })

    return plainToInstance(EventTodoEntity, todo)
  }

  async updateTodo(id: number, dto: UpdateTodoDto) {
    const todo = await this.prismaService.eventTodo.update({
      where: { id },
      data: dto,
    })

    return plainToInstance(EventTodoEntity, todo)
  }

  async removeTodo(id: number) {
    const todo = await this.prismaService.eventTodo.delete({
      where: { id },
    })

    return plainToInstance(EventTodoEntity, todo)
  }
}
