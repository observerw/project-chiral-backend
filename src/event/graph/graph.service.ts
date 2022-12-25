import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { inArray, node, relation } from 'cypher-query-builder'
import { CypherService } from 'src/database/cypher/cypher.service'
import { PrismaService } from 'nestjs-prisma'
import { EventNodeEntity } from '../entities/event-node.entity'
import { EventEntity } from '../entities/event.entity'
import type { CreateGraphDto } from './dto/create-graph.dto'
import type { CreateRelationDto } from './dto/create-relation.dto'
import { EventRelationEntity } from './entities/event-relation.entity'
import { GraphNodeEntity } from './entities/graph-node.entity'
import { GraphEntity } from './entities/graph.entity'
import { EVENT, EVENT_GRAPH } from './neo/node.schema'
import { CONTAINS } from './neo/relation.schema'

@Injectable()
export class GraphService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cypherService: CypherService,
  ) {}

  /**
   * 创建新图
   *
   * 如果提供了事件列表，则顺便将事件节点与图节点关联
   */
  async createGraph({ name, description, eventIds }: CreateGraphDto) {
    return (await this.cypherService
      .createNodeWithUUID('graph', EVENT_GRAPH, { name, description })
      .with('graph')
      .matchNode('e', EVENT)
      .where({ 'e.id': inArray(eventIds) })
      .create([node('graph'), relation('out', 'r', CONTAINS), node('e')])
      .return('g')
      .run())
      .map(r => plainToInstance(GraphNodeEntity, r.graph))[0]
  }

  /**
   * 将事件添加到图中
   * @param eventId 待添加的事件id
   * @param graphId 待添加到的图id
   */
  async addToGraph(eventId: number, graphId: string) {
    await this.cypherService
      .matchNode('g', EVENT_GRAPH, { id: graphId })
      .matchNode('n', EVENT, { id: eventId })
      .create([node('g'), relation('out', 'r', CONTAINS), node('n')])
      .run()
  }

  /**
   * 将图添加到集合事件中
   * @param graphId 待添加的图id
   * @param eventId 待添加到的集合事件id
   */
  async addToEvent(graphId: string, eventId: string) {
    await this.cypherService
      .matchNode('g', EVENT_GRAPH, { id: graphId })
      .matchNode('n', EVENT, { id: eventId })
      .create([node('n'), relation('out', 'r', CONTAINS), node('g')])
      .run()
  }

  /**
   * 查询图
   * @returns graph: 图节点，events: 图中的事件节点，relations: 图中的关系
   */
  async getGraph(graphId: string) {
    const [graphResult, NodeResult, RelationResult] = await Promise.all([
      this.cypherService
        .matchNode('graph', EVENT_GRAPH, { id: graphId })
        .return('graph')
        .run(),
      this.cypherService
        .matchNode('g', EVENT_GRAPH, { id: graphId })
        .match([node('g'), relation('out', [CONTAINS]), node('event', EVENT)])
        .return('event')
        .run(),
      this.cypherService
        .matchNode('g', EVENT_GRAPH, { id: graphId })
        .match([node('a', 'Event'), relation('out', 'relation'), node('b', 'Event')])
        .raw('WHERE (g)-->(a) AND (g)-->(b)')
        .return('relation')
        .run(),
    ])

    const graph = graphResult.map(r => plainToInstance(GraphNodeEntity, r.graph))[0]
    const nodes = NodeResult.map(r => plainToInstance(EventNodeEntity, r.event))
    const relations = RelationResult.map(r => plainToInstance(EventRelationEntity, r.relation))

    return plainToInstance(GraphEntity, { graph, nodes, relations })
  }

  /**
   * 查询某个事件属于哪些图
   */
  async getSuperGraphs(eventId: number) {
    return (await this.cypherService
      .match([
        node('graph', EVENT_GRAPH),
        relation('out', [CONTAINS]),
        node([EVENT], { id: eventId }),
      ])
      .return('graph')
      .run())
      .map(r => plainToInstance(GraphNodeEntity, r.graph))
  }

  /**
   * 查询某个事件包含哪些图
   */
  async getSubGraphs(eventId: number) {
    return (await this.cypherService
      .match([
        node([EVENT], { id: eventId }),
        relation('out', [CONTAINS]),
        node('graph', [EVENT_GRAPH]),
      ])
      .return('graph')
      .run())
      .map(r => plainToInstance(GraphNodeEntity, r.graph))
  }

  /**
   * 查询某个事件属于哪些集合事件
   *
   * 查询方法为：查询某个事件属于哪些图，然后查询这些图属于哪些集合事件
   */
  async getSuperEvents(eventId: number) {
    const eventIds = (await this.cypherService
      .match([
        node('event', EVENT),
        relation('out', [CONTAINS]),
        node([EVENT_GRAPH]),
        relation('out', [CONTAINS]),
        node([EVENT], { id: eventId }),
      ])
      .return('event')
      .run())
      .map(r => r.event.properties.id as number)

    const events = await this.prismaService.event.findMany({
      where: { id: { in: eventIds } },
    })

    return events.map(e => plainToInstance(EventEntity, e))
  }

  async createRelation(dto: CreateRelationDto) {
    // TODO
  }
}
