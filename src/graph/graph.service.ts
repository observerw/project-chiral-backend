import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { CypherService } from 'src/database/cypher/cypher.service'
import { getProjectId } from 'src/utils/get-header'
import type { NodeIdDto } from './dto/node-id.dto'
import type { RelationIdDto } from './dto/relation-id.dto'
import { NodeEntity } from './entities/node.entity'
import { RelationEntity } from './entities/relation.entity'
import { RelationsEntity } from './entities/relations.entity'
import type { RelationType } from './schema'
import { RelationSchema } from './schema'

@Injectable()
export class GraphService {
  constructor(
    private readonly cypherService: CypherService,
  ) {}

  async getRelations({ type, id }: NodeIdDto) {
    const query = await this.cypherService.execute`
    match (a:${type} ${{ id }})-[r]-(b)
    return
      type(r) as type,
      startnode(r).id = a.id as out,
      b.id as id
    `.run() as { type: RelationType; out: boolean; id: number }[]

    const relations = new RelationsEntity()
    for (const { type, out, id } of query) {
      const rel = relations[type]
      if (out) { rel.to.push(id) }
      else { rel.from.push(id) }
    }

    return relations
  }

  async createRelation({ from, to, type }: RelationIdDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match (from:${fromType} ${{ id: from }}), (to:${toType} ${{ id: to }})
    create (from)-[r:${type}]->(to)
    return r
    `.run()[0]

    return plainToInstance(RelationEntity, query?.r)
  }

  async removeRelation({ from, to, type }: RelationIdDto) {
    const { from: fromType, to: toType } = RelationSchema[type]
    const query = await this.cypherService.execute`
    match (from:${fromType} ${{ id: from }})-[r:${type}]->(to:${toType} ${{ id: to }})
    delete r
    return r
    `.run()[0]

    return plainToInstance(RelationEntity, query?.r)
  }

  async createNode({ type, id }: NodeIdDto) {
    const projectId = getProjectId()

    const query = await this.cypherService.execute`
    create (n:${type} ${{ id, projectId }})
    return n
    `.run()[0]

    return plainToInstance(NodeEntity, query?.n)
  }

  async removeNode({ type, id }: NodeIdDto) {
    const query = await this.cypherService.execute`
    match (n:${type} ${{ id }})
    detach delete n
    return n
    `.run()[0]

    return plainToInstance(NodeEntity, query?.n)
  }

  // async getPathToEvent(source: number, target: number) {
  //   const projectId = getProjectId()
  //   await this.cypherService.execute`
  //   call gds.graph.project(
  //     'events_${projectId}',
  //     ${{ [EVENT]: { properties: { projectId } } }},
  //     [${HAPPENED_AFTER}, ${LED_TO}, ${AFFECTED}, ${INCLUDES}]
  //   )
  //   match
  //     (source:${EVENT} ${{ id: source, projectId }}),
  //     (target:${EVENT} ${{ id: target, projectId }})
  //   call gds.dfs.stream(
  //     'events_${projectId}',
  //     {
  //       sourceNode: source,
  //       targetNodes: [target],
  //     }
  //   )
  //   yield path
  //   return path
  //   `.run()
  // }
}
