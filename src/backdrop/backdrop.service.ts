import { Injectable } from '@nestjs/common'
import type { CreateBackdropDto } from './dto/create-backdrop.dto'
import type { UpdateBackdropDto } from './dto/update-backdrop.dto'

@Injectable()
export class BackdropService {
  create(createBackdropDto: CreateBackdropDto) {
    return 'This action adds a new backdrop'
  }

  findAll() {
    return 'This action returns all backdrop'
  }

  findOne(id: number) {
    return `This action returns a #${id} backdrop`
  }

  update(id: number, updateBackdropDto: UpdateBackdropDto) {
    return `This action updates a #${id} backdrop`
  }

  remove(id: number) {
    return `This action removes a #${id} backdrop`
  }
}
