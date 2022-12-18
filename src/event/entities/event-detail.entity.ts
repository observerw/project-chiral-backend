import type { GraphNodeEntity } from '../graph/entities/graph-node.entity'
import { EventEntity } from './event.entity'

export class EventDetailEntity extends EventEntity {
  superEvents: EventEntity[]
  superGraphs: GraphNodeEntity[]
  subGraphs: GraphNodeEntity[]
}
