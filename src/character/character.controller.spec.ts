import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { CharacterController } from './character.controller'
import { CharacterService } from './character.service'

describe('CharacterController', () => {
  let controller: CharacterController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [CharacterService],
    }).compile()

    controller = module.get<CharacterController>(CharacterController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
