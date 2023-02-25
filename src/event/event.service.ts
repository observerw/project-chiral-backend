import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'nestjs-prisma'
import { getProjectId } from 'src/utils/get-header'
import type { UpdateContentDto } from './dto/content/update-content.dto'
import type { CreateEventDto } from './dto/event/create-event.dto'
import type { UpdateEventDto } from './dto/event/update-event.dto'
import { EventContentEntity } from './entities/event-content.entity'
import { EventEntity } from './entities/event.entity'
import { GraphService } from './graph/graph.service'
import { EventTodoEntity } from './entities/event-todo.entity'
import type { CreateTodoDto } from './dto/todo/create-todo.dto'
import type { UpdateTodoDto } from './dto/todo/update-todo.dto'
import type { GetAllEventQueryDto } from './dto/event/get-all-event-query-dto'
import { EventDetailEntity } from './entities/event-detail.entity'

@Injectable()
export class EventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly graphService: GraphService,
  ) {}

  // ---------------------------------- event ---------------------------------

  async get(id: number) {
    const event = await this.prismaService.event.findUniqueOrThrow({
      where: { id },
    })

    return plainToInstance(EventEntity, event)
  }

  async getDetail(id: number) {
    const { characters, scenes, sups, subs, ...event } = await this.prismaService.event.findUniqueOrThrow({
      where: { id },
      include: {
        characters: { select: { id: true } },
        scenes: { select: { id: true } },
        sups: { select: { id: true } },
        subs: { select: { id: true } },
      },
    })

    return plainToInstance(EventDetailEntity, {
      ...event,
      characters: characters.map(v => v.id),
      scenes: scenes.map(v => v.id),
      sups: sups.map(v => v.id),
      subs: subs.map(v => v.id),
    })
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

  async create({ characters, scenes, sups, subs, ...rest }: CreateEventDto) {
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
        projectId,
        serial,
        content: { create: {} },
        type: subs?.length === 0 ? 'ATOM' : 'COLLECTION',
        characters: { connect: characters?.map(id => ({ id })) },
        scenes: { connect: scenes?.map(id => ({ id })) },
        sups: { connect: sups?.map(id => ({ id })) },
        subs: { connect: subs?.map(id => ({ id })) },
      },
    })

    await this.graphService.createEvent(result.id)

    return plainToInstance(EventEntity, result)
  }

  async update(id: number, { characters, scenes, sups, subs, ...rest }: UpdateEventDto) {
    const result = await this.prismaService.event.update({
      where: { id },
      data: {
        ...rest,
        type: subs?.length === 0 ? 'ATOM' : 'COLLECTION',
        characters: { connect: characters?.map(id => ({ id })) },
        scenes: { connect: scenes?.map(id => ({ id })) },
        sups: { connect: sups?.map(id => ({ id })) },
        subs: { connect: subs?.map(id => ({ id })) },
      },
    })

    return plainToInstance(EventEntity, result)
  }

  async remove(id: number, cascade: boolean) {
    // TODO 软删除
    const [event] = await Promise.all([
      this.prismaService.event.delete({
        where: { id },
      }),
      this.graphService.removeEvent(id),
    ])

    const events = [plainToInstance(EventEntity, event)]

    if (cascade) {
      const subIds = (await this.graphService.getSubEvents(id)).map(e => e.properties.id)
      const subEvents = await Promise.all(subIds.map(id => this.remove(id, true)))
      events.push(...subEvents.flat())
    }

    return events
  }

  async connect(id: number, type: 'scenes' | 'characters' | 'sups' | 'subs', connectIds: number[]) {
    const result = await this.prismaService.event.update({
      where: { id },
      data: {
        [type]: { connect: connectIds.map(id => ({ id })) },
      },
    })

    return plainToInstance(EventEntity, result)
  }

  async disconnect(id: number, type: 'scenes' | 'characters' | 'sups' | 'subs', disconnectIds: number[]) {
    const result = await this.prismaService.event.update({
      where: { id },
      data: {
        [type]: { disconnect: disconnectIds.map(id => ({ id })) },
      },
    })

    return plainToInstance(EventEntity, result)
  }

  // ---------------------------------- content ---------------------------------

  async getContent(eventId: number) {
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
