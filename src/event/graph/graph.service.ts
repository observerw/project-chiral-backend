import { Injectable } from '@nestjs/common'
import { CypherService } from 'src/database/cypher/cypher.service'
import { plainToInstance } from 'class-transformer'
import type { EventRelation } from 'src/graph/schema'
import { AFFECT, CONTAINS, EVENT, LEAD_TO, SUB_TO } from 'src/graph/schema'
import { GraphEntity } from 'src/graph/entities/graph.entity'
import { getProjectId } from 'src/utils/get-header'
import { NodeEntity } from 'src/graph/entities/node/node.entity'
import { RelationEntity } from 'src/graph/entities/relation/relation.entity'

@Injectable()
export class GraphService {
  constructor(
    private readonly cypherService: CypherService,
  ) { }

  async get(id: number) {
    const projectId = getProjectId()
    const result = await this.cypherService.execute`
    match (n:${EVENT} ${{ id, projectId }})
    return n`
      .first()
    return plainToInstance(NodeEntity, result?.n)
  }

  async getSups(id: number) {
    const projectId = getProjectId()
    const nodes = await this.cypherService
      .execute`
      match (n:${EVENT})-[:${CONTAINS}]->(:${EVENT} ${{ id, projectId }})
      return n`
      .run()

    return plainToInstance(GraphEntity, {
      nodes: nodes.map(n => plainToInstance(NodeEntity, n.n)),
      relations: [],
    })
  }

  async getSubs(id: number) {
    const projectId = getProjectId()
    const [nodes, relations] = await Promise.all([
      this.cypherService
        .execute`
        match (:${EVENT} ${{ id, projectId }})-[:${CONTAINS}]->(n:${EVENT})
        return n`
        .run(),
      this.cypherService.execute`
      match (n:${EVENT} ${{ id, projectId }})
      match (a:${EVENT})-[r]->(b:${EVENT})
      where (n)-[:${CONTAINS}]->(a) and (n)-[:${CONTAINS}]->(b)
      return r`
        .run(),
    ])

    return plainToInstance(GraphEntity, {
      nodes: nodes.map(n => plainToInstance(NodeEntity, n.n)),
      relations: relations.map(r => plainToInstance(RelationEntity, r.r)),
    })
  }

  async getAllSubs(id: number): Promise<GraphEntity> {
    const { nodes, relations } = await this.getSubs(id)
    const subSubs = await Promise.all(nodes.map(s => this.getAllSubs(s.properties.id)))
    const subNodes = subSubs.map(s => s.nodes).flat()
    const subRelations = subSubs.map(s => s.relations).flat()

    return plainToInstance(GraphEntity, {
      nodes: [...nodes, ...subNodes],
      relations: [...relations, ...subRelations],
    })
  }

  async getPathToEvent(source: number, target: number) {
    const projectId = getProjectId()
    await this.cypherService.execute`
    call gds.graph.project(
      'events_${projectId}',
      ${{
        [EVENT]: { properties: { projectId } },
      }},
      [${SUB_TO}, ${LEAD_TO}, ${AFFECT}, ${CONTAINS}]
    )
    match 
      (source:${EVENT} ${{ id: source, projectId }}), 
      (target:${EVENT} ${{ id: target, projectId }})
    call gds.dfs.stream(
      'events_${projectId}', 
      {
        sourceNode: source,
        targetNodes: [target],
      }
    )
    yield path
    return path
    `.run()
    // TODO
  }

  async create(id: number) {
    const projectId = getProjectId()
    await this.cypherService.execute`
    create (n:${EVENT} ${{ id, projectId }})
    `.run()
  }

  async remove(id: number) {
    const projectId = getProjectId()
    await this.cypherService.execute`
    match (n:${EVENT} ${{ id, projectId }})
    detach delete n
    `.run()
  }

  async addRelation(from: number, to: number[], type: EventRelation) {
    const projectId = getProjectId()
    await this.cypherService.execute`
    match 
      (from:${EVENT} ${{ id: from, projectId }}), 
      (to:${EVENT} ${{ projectId }})
    where to.id in ${to}
    create (from)-[:${type}]->(to)
    `.run()
  }

  async removeRelation(from: number, to: number, type: EventRelation) {
    const projectId = getProjectId()
    await this.cypherService.execute`
    match
      (from:${EVENT} ${{ id: from, projectId }})
      -[r:${type}]->
      (to:${EVENT} ${{ id: to, projectId }})
    delete r
    `.run()
  }
}
