import { Body, Controller, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AiService } from './ai.service'
import { SummarizeDescDto } from './dto/summarize-desc.dto'

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
  ) {}

  @Post(':id/summarize/title')
  async updateEventName(@Param('id') id: number) {
    return this.aiService.updateEventName(id)
  }

  @Post(':id/summarize/desc')
  async updateEventDesc(@Param('id') id: number, @Body() dto: SummarizeDescDto) {
    return this.aiService.updateEventDesc(id, dto)
  }

  @Post(':id/character')
  async updateChara(@Param('id') id: number) {
    return this.aiService.updateChara(id)
  }
}
