import { Type } from 'class-transformer'
import { EventNodeEntity } from './event-node.entity'
import { EventRelationEntity } from './event-relation.entity'

export class EventGraphEntity {
  id: number

  @Type(() => EventNodeEntity)
  nodes: EventNodeEntity[]

  @Type(() => EventRelationEntity)
  relations: EventRelationEntity[]
}
