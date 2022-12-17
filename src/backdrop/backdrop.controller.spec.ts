import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { BackdropController } from './backdrop.controller'
import { BackdropService } from './backdrop.service'

describe('BackdropController', () => {
  let controller: BackdropController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackdropController],
      providers: [BackdropService],
    }).compile()

    controller = module.get<BackdropController>(BackdropController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
