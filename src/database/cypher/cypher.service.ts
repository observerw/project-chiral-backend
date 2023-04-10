import util from 'util'
import type { OnApplicationShutdown } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { Connection } from 'cypher-query-builder'

const removeUndefined = (data: Record<string, any>) => Object.keys(data)
  .filter(key => data[key] !== null && data[key] !== undefined)
  .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})

@Injectable()
export class CypherService extends Connection implements OnApplicationShutdown {
  constructor() {
    const url = process.env.NEO_URL ?? ''
    const username = process.env.NEO_USERNAME ?? ''
    const password = process.env.NEO_PASSWORD ?? ''

    super(url, { username, password })
  }

  async onApplicationShutdown(_signal?: string | undefined) {
    await this.close()
  }

  /**
   * 自动添加 UUID属性
   */
  createWithUUID(
    ...args: Parameters<typeof Connection.prototype.create>
  ) {
    return this.create(...args)
      .setVariables({ id: 'apoc.create.uuid()' })
  }

  createNodeWithUUID(
    ...args: Parameters<typeof Connection.prototype.createNode>
  ) {
    return this.createNode(...args)
      .setVariables({ id: 'apoc.create.uuid()' })
  }

  // FIXME 待测试
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
        const value = removeUndefined(args[pos])
        query += typeof value === 'object'
        // 转换为不含双引号的JSON
          ? util.inspect(value)
          : `${value}`
      }
    }

    return this.raw(query)
  }
}
