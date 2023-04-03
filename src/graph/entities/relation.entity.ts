import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import type { Relation } from 'cypher-query-builder'
import { RelationEnum, RelationType } from 'src/graph/schema'

export class RelationProperty {
  projectId: number
}

export class RelationEntity implements Relation<RelationProperty> {
  identity: string
  start: string
  end: string

  @Type(() => RelationEntity)
  properties: RelationProperty

  @ApiProperty({ enum: RelationEnum })
  label: RelationType
}
