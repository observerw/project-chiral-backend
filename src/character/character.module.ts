import { Module } from '@nestjs/common'
import { GraphModule } from 'src/graph/graph.module'
import { CharacterService } from './character.service'
import { CharacterController } from './character.controller'

@Module({
  imports: [GraphModule],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
