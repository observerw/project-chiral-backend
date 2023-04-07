import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { NodeIdDto } from './dto/node-id.dto'
import { RelationIdDto } from './dto/relation-id.dto'
import { GraphService } from './graph.service'

@ApiTags('graph')
@Controller('graph')
export class GraphController {
  constructor(
    private readonly graphService: GraphService,
  ) { }

  @Get('relation')
  async getRelations(@Query() dto: NodeIdDto) {
    return this.graphService.getRelations(dto)
  }

  @Post('relation')
  async createRelation(@Body() dto: RelationIdDto) {
    return this.graphService.createRelation(dto)
  }

  @Delete('relation')
  async removeRelation(@Body() dto: RelationIdDto) {
    return this.graphService.removeRelation(dto)
  }

  @Post('node')
  async createNode(@Body() dto: NodeIdDto) {
    return {}
    // return this.graphService.createNode(dto)
  }

  @Delete('node')
  async removeNode(@Body() dto: NodeIdDto) {
    return {}
    // return this.graphService.removeNode(dto)
  }
}
