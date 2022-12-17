import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GraphService } from './graph.service'

@ApiTags('event/graph')
@Controller('event/graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}
}
