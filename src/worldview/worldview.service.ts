import { Injectable } from '@nestjs/common'
import type { CreateWorldviewDto } from './dto/create-worldview.dto'
import type { UpdateWorldviewDto } from './dto/update-worldview.dto'

@Injectable()
export class WorldviewService {
  create(createWorldviewDto: CreateWorldviewDto) {
    return 'This action adds a new worldview'
  }

  findAll() {
    return `This action returns all worldview`
  }

  findOne(id: number) {
    return `This action returns a #${id} worldview`
  }

  update(id: number, updateWorldviewDto: UpdateWorldviewDto) {
    return `This action updates a #${id} worldview`
  }

  remove(id: number) {
    return `This action removes a #${id} worldview`
  }
}
