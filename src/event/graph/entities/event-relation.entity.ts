import { Type } from 'class-transformer'
import type { Relation } from 'cypher-query-builder'

export class EventRelationProperty {
  description?: string
}

export class EventRelationEntity implements Relation<EventRelationProperty> {
  label: string

  identity: string
  start: string
  end: string

  @Type(() => EventRelationProperty)
  properties: EventRelationProperty
}
