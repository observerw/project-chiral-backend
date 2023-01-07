import { Injectable } from '@nestjs/common'
import { CypherService } from 'src/database/cypher/cypher.service'
import { PrismaService } from 'nestjs-prisma'
import { inArray, node, relation } from 'cypher-query-builder'
import { plainToInstance } from 'class-transformer'
import { EVENT } from './neo/node.schema'
import { CONTAINS } from './neo/relation.schema'
import { EventNodeEntity } from './entities/event-node.entity'
import { EventRelationEntity } from './entities/event-relation.entity'
import { EventGraphEntity } from './entities/event-graph.entity'

@Injectable()
export class GraphService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cypherService: CypherService,
  ) { }

  async createEvent(id: number) {
    await this.cypherService.createNode('n', EVENT, { id }).run()
  }

  async removeEvent(id: number) {
    await this.cypherService
      .matchNode('n', EVENT, { id })
      .delete('n', { detach: true })
      .run()
  }

  async addSubEvents(superEventId: number, subEventIds: number[]) {
    await Promise.all([
      this.cypherService
        .matchNode('superEvent', EVENT, { id: superEventId })
        .matchNode('subEvent', EVENT, { id: inArray(subEventIds) })
        .create([
          node('superEvent'),
          relation('out', [CONTAINS]),
          node('subEvent'),
        ])
        .run(),
      this.prismaService.event.update({
        where: { id: superEventId },
        data: { type: 'COLLECTION' },
      }),
    ])
  }

  async removeSubEvents(superEventId: number, subEventIds: number[]) {
    // 去重防止剩余子事件数量统计出错
    subEventIds = Array.from(new Set(subEventIds))

    const count = await this.cypherService
      .match([
        node([EVENT], { id: superEventId }),
        relation('out', 'ra', [CONTAINS]),
        node([EVENT]),
      ])
      .match([
        node([EVENT], { id: superEventId }),
        relation('out', 'rb', [CONTAINS]),
        node([EVENT], { id: inArray(subEventIds) }),
      ])
      .delete('rb')
      .return('count(ra)')
      .run()[0]['count(ra)'] as number

    // 如果把子事件全部都移除了，认为这个事件变为原子事件
    if (count === subEventIds.length) {
      await this.prismaService.event.update({
        where: { id: superEventId },
        data: { type: 'ATOM' },
      })
    }
  }

  async getSuperEvents(id: number) {
    const result = await this.cypherService
      .match([
        node('superEvent', [EVENT]),
        relation('out', [CONTAINS]),
        node([EVENT], { id }),
      ])
      .return('superEvent')
      .run()

    return result.map(r => plainToInstance(EventNodeEntity, r.superEvent))
  }

  async getSubEvents(id: number) {
    const result = await this.cypherService
      .match([
        node([EVENT], { id }),
        relation('out', [CONTAINS]),
        node('subEvent', [EVENT]),
      ])
      .return('subEvent')
      .run()

    return result.map(r => plainToInstance(EventNodeEntity, r.subEvent))
  }

  async addRelation(fromId: number, toId: number, type: string) {
    await this.cypherService
      .matchNode('a', EVENT, { id: fromId })
      .matchNode('b', EVENT, { id: toId })
      .create([
        node('a'),
        relation('out', [type]),
        node('b'),
      ])
      .run()
  }

  async removeRelation(fromId: number, toId: number, type: string) {
    await this.cypherService
      .match([
        node([EVENT], { id: fromId }),
        relation('out', 'r', [type]),
        node([EVENT], { id: toId }),
      ])
      .delete('r')
      .run()
  }

  async getGraph(id: number) {
    const [NodeResult, RelationResult] = await Promise.all([
      this.cypherService
        .matchNode('superEvent', EVENT, { id })
        .match([node('superEvent'), relation('out', [CONTAINS]), node('subEvent', EVENT)])
        .return('subEvent')
        .run(),
      this.cypherService
        .matchNode('superEvent', EVENT, { id })
        .match([node('a', [EVENT]), relation('out', 'r'), node('b', [EVENT])])
        .raw(`WHERE (superEvent)-[:${CONTAINS}]->(a) AND (superEvent)-[:${CONTAINS}]->(b)`)
        .return('r')
        .run(),
    ])

    const nodes = NodeResult.map(r => plainToInstance(EventNodeEntity, r.event))
    const relations = RelationResult.map(r => plainToInstance(EventRelationEntity, r.relation))

    return plainToInstance(EventGraphEntity, { id, nodes, relations })
  }
}
