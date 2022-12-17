import { Module } from '@nestjs/common'
import { CypherService } from 'src/database/cypher/cypher.service'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { GraphService } from './graph.service'
import { GraphController } from './graph.controller'

@Module({
  controllers: [GraphController],
  providers: [GraphService, CypherService, PrismaService],
})
export class GraphModule {}
