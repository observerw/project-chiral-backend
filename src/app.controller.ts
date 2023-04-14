import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'
import { GraphApiService } from './api/graph-api.service'

@ApiTags()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly graphApiService: GraphApiService,
  ) {}

  @Get()
  async test() {
    return (await this.graphApiService.getTest()).data
  }
}
