import { AmqpConnection } from '@nestjs-plus/rabbitmq'
import { Injectable } from '@nestjs/common'
import { EventService } from 'src/event/event.service'
import { cleanHTML } from 'src/utils/clean'
import type { SummarizeDescDto } from './dto/summarize-desc.dto'
import type { ResponseDto } from './dto/response.dto'

@Injectable()
export class AiService {
  constructor(
    private readonly conn: AmqpConnection,
    private readonly eventService: EventService,
  ) {}

  async updateEventName(id: number) {
    const content = (await this.eventService.getContent(id)).content
    const { data } = await this.conn.request<ResponseDto>({
      exchange: '',
      routingKey: 'summarize_title',
      timeout: 50000,
      payload: {
        doc: cleanHTML(content),
      },
    })

    await this.eventService.update(id, {
      name: data,
    })

    return data
  }

  async updateEventDesc(id: number, dto: SummarizeDescDto) {
    const content = (await this.eventService.getContent(id)).content

    const { data } = await this.conn.request<ResponseDto>({
      exchange: '',
      routingKey: 'summarize_desc',
      timeout: 50000,
      payload: {
        ...dto,
        doc: cleanHTML(content),
      },
    })

    await this.eventService.update(id, {
      description: data,
    })

    return data
  }
}
