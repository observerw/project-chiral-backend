import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { ScenceController } from './scence.controller'
import { ScenceService } from './scence.service'

describe('ScenceController', () => {
  let controller: ScenceController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScenceController],
      providers: [ScenceService],
    }).compile()

    controller = module.get<ScenceController>(ScenceController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
