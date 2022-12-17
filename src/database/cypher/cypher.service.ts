import type { OnApplicationShutdown } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { Connection } from 'cypher-query-builder'

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
  // execute<T>(
  //   strs: TemplateStringsArray,
  //   ...args: any[]
  // ) {
  //   let query = ''
  //   for (let i = 0; i < strs.length + args.length; ++i) {
  //     if (i % 2 === 0) {
  //       query += strs[i / 2]
  //     }
  //     else {
  //       query += `${i}`
  //     }
  //   }

  //   return this.raw(query).run<T>()
  // }
}
