import { Type } from 'class-transformer'
import type { Node } from 'cypher-query-builder'

export class EventNodeProperty {
  id: number
}

export class EventNodeEntity implements Node<EventNodeProperty> {
  identity: string

  @Type(() => String)
  labels: string[]

  @Type(() => EventNodeProperty)
  properties: EventNodeProperty
}
