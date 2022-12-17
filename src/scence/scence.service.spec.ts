import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { ScenceService } from './scence.service'

describe('ScenceService', () => {
  let service: ScenceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScenceService],
    }).compile()

    service = module.get<ScenceService>(ScenceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
