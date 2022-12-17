import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { CypherService } from 'src/database/cypher/cypher.service'
import { EventService } from './event.service'
import { EventController } from './event.controller'
import { GraphModule } from './graph/graph.module'
import { GraphService } from './graph/graph.service'

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService, CypherService, GraphService,
  ],
  imports: [GraphModule],
})
export class EventModule {}
