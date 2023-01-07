import { Module } from '@nestjs/common'
import { CypherService } from 'src/database/cypher/cypher.service'
import { PrismaService } from 'nestjs-prisma'
import { GraphService } from './graph.service'

@Module({
  providers: [GraphService, CypherService, PrismaService],
})
export class GraphModule {}
