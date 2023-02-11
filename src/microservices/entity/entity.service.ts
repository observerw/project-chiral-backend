import { Injectable } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { TestDto } from './dto/test.dto'

@Injectable()
export class EntityService {
  @ApiOperation({})
  async test() {
    return new TestDto()
  }
}
