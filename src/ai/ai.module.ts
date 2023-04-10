import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { EventService } from 'src/event/event.service'
import { CharacterService } from 'src/character/character.service'
import { RabbitMQModule } from '@nestjs-plus/rabbitmq'
import { ProjectService } from 'src/project/project.service'
import { AiController } from './ai.controller'
import { AiService } from './ai.service'

@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: process.env.RMQ_URI as string,
      defaultRpcTimeout: 50000,
      defaultExchangeType: '',
    }),
  ],
  controllers: [AiController],
  providers: [AiService, PrismaService, EventService, CharacterService, ProjectService],
  exports: [AiService],
})
export class AiModule {}
