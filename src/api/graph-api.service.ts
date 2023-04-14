import { Injectable } from '@nestjs/common'
import { DefaultApi } from './graph-api/api'
import { Configuration } from './graph-api/configuration'

@Injectable()
export class GraphApiService extends DefaultApi {
  constructor() {
    super(new Configuration({
      basePath: 'http://127.0.0.1:4001',
    }))
  }
}
