import { Type } from 'class-transformer'
import type { Node } from 'cypher-query-builder'

export class GraphNodeProperty {
  id: string
  name: string
  description?: string
}

export class GraphNodeEntity implements Node<GraphNodeProperty> {
  identity: string

  @Type(() => String)
  labels: string[]

  @Type(() => GraphNodeProperty)
  properties: GraphNodeProperty
}
