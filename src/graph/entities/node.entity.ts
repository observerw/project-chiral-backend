import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import type { Node } from 'cypher-query-builder'
import type { NodeType } from 'src/graph/schema'
import { NodeEnum } from 'src/graph/schema'

export class NodeProperty {
  id: number
  projectId: number
  name: string
}

export class NodeEntity implements Node<NodeProperty> {
  identity: string

  @Type(() => String)
  @ApiProperty({
    isArray: true,
    enum: NodeEnum,
  })
  labels: NodeType[]

  @Type(() => NodeProperty)
  properties: NodeProperty
}
