import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AiService } from './ai.service'
import { SummarizeDescDto } from './dto/summarize-desc.dto'

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
  ) {}

  @Get(':id/summarize/title')
  async summarizeTitle(@Param('id') id: number) {
    return this.aiService.summarizeTitle(id)
  }

  @Get(':id/summarize/desc')
  async summarizeDesc(@Param('id') id: number, @Query() dto: SummarizeDescDto) {
    return this.aiService.summarizeDesc(id, dto)
  }
}
