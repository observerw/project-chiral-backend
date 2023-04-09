import { AmqpConnection } from '@nestjs-plus/rabbitmq'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { EventService } from 'src/event/event.service'
import { cleanHTML } from 'src/utils/clean'
import { CharacterService } from 'src/character/character.service'
import { GraphService } from 'src/graph/graph.service'
import { PARTICIPATED_IN } from 'src/graph/schema'
import { PrismaService } from 'nestjs-prisma'
import type { SummarizeDescDto } from './dto/summarize-desc.dto'
import type { ResponseDto } from './dto/response.dto'

@Injectable()
export class AiService {
  constructor(
    private readonly conn: AmqpConnection,
    private readonly prismaService: PrismaService,
    private readonly graphService: GraphService,
    private readonly eventService: EventService,
    private readonly charaService: CharacterService,
  ) {}

  async updateEventName(id: number) {
    const content = (await this.eventService.getContent(id)).content
    const { data, code, message } = await this.conn.request<ResponseDto>({
      exchange: '',
      routingKey: 'summarize_title',
      payload: {
        doc: cleanHTML(content),
      },
    })

    if (code !== 0) { throw new InternalServerErrorException(message) }

    await this.eventService.update(id, {
      name: data,
    })

    return data
  }

  async updateEventDesc(id: number, dto: SummarizeDescDto) {
    const content = (await this.eventService.getContent(id)).content

    const { data, code, message } = await this.conn.request<ResponseDto>({
      exchange: '',
      routingKey: 'summarize_desc',
      payload: {
        ...dto,
        doc: cleanHTML(content),
      },
    })

    if (code !== 0) { throw new InternalServerErrorException(message) }

    await this.eventService.update(id, {
      description: data,
    })

    return data
  }

  async updateChara(eventId: number) {
    const content = (await this.eventService.getContent(eventId)).content
    const charas = (await this.charaService.getAll({}))
      .map(({ id, name, alias }) => ({ id, name, alias }))

    const { data, code, message } = await this.conn.request<ResponseDto<{
      id: number
      name: string
      alias: string
      score: number
    }[][]>>({
      exchange: '',
      routingKey: 'entity_resolve',
      payload: {
        charas,
        doc: cleanHTML(content),
      },
    })

    if (code !== 0) { throw new InternalServerErrorException(message) }

    // 如果只有一个选项，说明是确定的，直接建立关系
    for (const options of data) {
      if (options.length === 1) {
        const [{ id }] = options
        await this.graphService.createRelation({
          type: PARTICIPATED_IN,
          from: id,
          to: eventId,
        })
      }
    }

    return data
  }
}
