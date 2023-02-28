import { ApiProperty } from '@nestjs/swagger'
import type { Relation } from 'cypher-query-builder'
import { CHARA_RELATE_TO } from 'src/graph/schema'
import { RelationProperty } from './relation.entity'

export class CharacterRelationProperty extends RelationProperty {
  type: string
}

export class CharacterRelationEntity implements Relation<CharacterRelationProperty> {
  identity: string
  start: string
  end: string

  @ApiProperty({ enum: [CHARA_RELATE_TO] })
  label: typeof CHARA_RELATE_TO

  properties: CharacterRelationProperty
}
