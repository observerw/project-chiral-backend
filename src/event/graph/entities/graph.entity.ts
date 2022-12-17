import { Type } from 'class-transformer'
import { EventNodeEntity } from 'src/event/entities/event-node.entity'
import { EventRelationEntity } from './event-relation.entity'

export class GraphEntity {
  @Type(() => GraphEntity)
  graph: GraphEntity

  @Type(() => EventNodeEntity)
  nodes: EventNodeEntity[]

  @Type(() => EventRelationEntity)
  relations: EventRelationEntity[]
}
