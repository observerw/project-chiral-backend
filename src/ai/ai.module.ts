import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { EventService } from 'src/event/event.service'
import { CharacterService } from 'src/character/character.service'
import { AiController } from './ai.controller'
import { AiService } from './ai.service'

@Module({
  imports: [],
  controllers: [AiController],
  providers: [AiService, PrismaService, EventService, CharacterService],
  exports: [AiService],
})
export class AiModule {}
