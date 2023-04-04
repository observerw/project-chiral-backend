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

  async summarizeTitle(id: number) {
    const content = (await this.eventService.getContent(id)).content
    const { data } = await this.conn.request<ResponseDto>({
      exchange: '',
      routingKey: 'summarize_title',
      payload: {
        doc: cleanHTML(content),
      },
    })

    return data
  }

  async summarizeDesc(id: number, dto: SummarizeDescDto) {
    const content = (await this.eventService.getContent(id)).content

    const { data } = await this.conn.request<ResponseDto>({
      exchange: '',
      routingKey: 'summarize_desc',
      payload: {
        ...dto,
        doc: cleanHTML(content),
      },
    })

    return data
  }
}
