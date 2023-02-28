import { Module } from '@nestjs/common'
import { CharacterService } from './character.service'
import { CharacterController } from './character.controller'
import { GraphService } from './graph/graph.service'

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, GraphService],
})
export class CharacterModule {}
