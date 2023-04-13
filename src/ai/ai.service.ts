import { AmqpConnection } from '@nestjs-plus/rabbitmq'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { EventService } from 'src/event/event.service'
import { cleanHTML } from 'src/utils/clean'
import { CharacterService } from 'src/character/character.service'
import { GraphService } from 'src/graph/graph.service'
import { PrismaService } from 'nestjs-prisma'
import { plainToInstance } from 'class-transformer'
import { PARTICIPATED_IN } from 'src/graph/schema'
import { ProjectService } from 'src/project/project.service'
import type { SummarizeDescDto } from './dto/summarize-desc.dto'
import type { ResponseDto } from './dto/response.dto'
import { CharaOptionsDto } from './dto/chara-options.dto'

@Injectable()
export class AiService {
  constructor(
    private readonly amq: AmqpConnection,
    private readonly prismaService: PrismaService,
    private readonly graphService: GraphService,
    private readonly eventService: EventService,
    private readonly charaService: CharacterService,
    private readonly projectService: ProjectService,
  ) {}

  async updateEventName(id: number) {
    const [{ content }, { lang }] = await Promise.all([
      this.eventService.getContent(id),
      this.projectService.getSettings(),
    ])
    const { data, code, message } = await this.amq.request<ResponseDto>({
      exchange: '',
      routingKey: 'summarize_title',
      payload: {
        doc: cleanHTML(content),
        lang,
      },
    })

    if (code !== 0) { throw new InternalServerErrorException(message) }

    await this.eventService.update(id, {
      name: data,
    })

    return data
  }

  async updateEventDesc(id: number, dto: SummarizeDescDto) {
    const [{ content }, { lang }] = await Promise.all([
      this.eventService.getContent(id),
      this.projectService.getSettings(),
    ])

    const { data, code, message } = await this.amq.request<ResponseDto>({
      exchange: '',
      routingKey: 'summarize_desc',
      payload: {
        ...dto,
        doc: cleanHTML(content),
        lang,
      },
    })

    if (code !== 0) { throw new InternalServerErrorException(message) }

    await this.eventService.update(id, {
      description: data,
    })

    return data
  }

  async updateChara(id: number) {
    const [{ content }, { lang }, charas] = await Promise.all([
      this.eventService.getContent(id),
      await this.projectService.getSettings(),
      this.charaService.getAll({}),
    ])

    const { data, code, message } = await this.amq.request<ResponseDto<CharaOptionsDto>>({
      exchange: '',
      routingKey: 'entity_resolve',
      payload: {
        table: charas.map(({ id, name, alias }) => ({ id, name, alias })),
        doc: cleanHTML(content),
        lang,
      },
    })

    if (code !== 0) { throw new InternalServerErrorException(message) }

    await this.eventService.update(id, {
      unresolved: data.unresolved,
    })

    // 把现有人物关系全部清除
    await this.graphService.removeRelation({
      type: PARTICIPATED_IN,
      to: id,
    })

    await Promise.all(
      data.resolved.map(
        async ({ id: charaId }) =>
          this.graphService.createRelation({
            type: PARTICIPATED_IN,
            from: charaId,
            to: id,
          }),
      ),
    )

    return plainToInstance(CharaOptionsDto, data)
  }
}
