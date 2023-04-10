import util from 'util'
import { Connection } from 'cypher-query-builder'

export const EVENT = 'EVENT' // 事件
export const CHARA = 'CHARA' // 角色
export const SCENE = 'SCENE' // 场景
export const CONTAINS = 'CONTAINS' // 包含

export class CypherService extends Connection {
  constructor(
    url: string,
    username: string,
    password: string,
  ) {
    super(url, { username, password })
  }

  execute(
    strs: TemplateStringsArray,
    ...args: any[]
  ) {
    let query = ''
    for (let i = 0; i < strs.length + args.length; ++i) {
      const pos = Math.floor(i / 2)
      if (i % 2 === 0) {
        query += strs[pos]
      }
      else {
        const value = args[pos]
        query += typeof value === 'object' ? util.inspect(value) : `${value}`
      }
    }

    return this.raw(query)
  }
}

const main = async () => {
  const conn = new CypherService(
    'bolt://120.53.230.250:7687',
    'neo4j',
    'neo4j',
  )

  const id = 2

  const result = conn.execute`match (n:${EVENT} ${{ id }})
      match (a:${EVENT})-[r]->(b:${EVENT})
      where (n)-[:${CONTAINS}]->(a) and (n)-[:${CONTAINS}]->(b)
      return r`.build()
  console.log(result)

  await conn.close()
}

// main()

