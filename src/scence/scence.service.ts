import { Injectable } from '@nestjs/common'
import type { CreateScenceDto } from './dto/create-scence.dto'
import type { UpdateScenceDto } from './dto/update-scence.dto'

@Injectable()
export class ScenceService {
  create(createScenceDto: CreateScenceDto) {
    return 'This action adds a new scence'
  }

  findAll() {
    return 'This action returns all scence'
  }

  findOne(id: number) {
    return `This action returns a #${id} scence`
  }

  update(id: number, updateScenceDto: UpdateScenceDto) {
    return `This action updates a #${id} scence`
  }

  remove(id: number) {
    return `This action removes a #${id} scence`
  }
}
