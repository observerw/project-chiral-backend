import { createReadStream } from 'fs'
import { Controller, Get, Header, StreamableFile } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api-docs')
  @Header('Content-Type', 'application/json')
  getApiDocs(): StreamableFile {
    const file = createReadStream('swagger.json')
    return new StreamableFile(file)
  }
}
