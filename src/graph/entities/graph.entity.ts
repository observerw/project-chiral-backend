import type { NodeEntity } from './node/node.entity'
import type { RelationEntity } from './relation/relation.entity'

export class GraphEntity<N extends NodeEntity = NodeEntity, R extends RelationEntity = RelationEntity> {
  nodes: N[]
  relations: R[]
}
