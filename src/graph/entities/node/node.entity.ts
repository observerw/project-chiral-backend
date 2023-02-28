import { Type } from 'class-transformer'
import type { Node } from 'cypher-query-builder'
import type { NodeType } from 'src/graph/schema'

export class NodeProperty {
  id: number
  projectId: number
}

export class NodeEntity implements Node<NodeProperty> {
  identity: string

  @Type(() => String)
  labels: NodeType[]

  @Type(() => NodeProperty)
  properties: NodeProperty
}
