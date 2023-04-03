import { Global, Module } from '@nestjs/common'
import { CypherService } from 'src/database/cypher/cypher.service'
import { GraphController } from './graph.controller'
import { GraphService } from './graph.service'

@Global()
@Module({
  controllers: [GraphController],
  providers: [GraphService, CypherService],
  exports: [GraphService],
})
export class GraphModule {}
