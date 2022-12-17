import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { BackdropService } from './backdrop.service'

describe('BackdropService', () => {
  let service: BackdropService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackdropService],
    }).compile()

    service = module.get<BackdropService>(BackdropService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
