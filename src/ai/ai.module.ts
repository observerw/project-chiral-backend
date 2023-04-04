import { RabbitMQModule } from '@nestjs-plus/rabbitmq'
import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { EventService } from 'src/event/event.service'
import { AiController } from './ai.controller'
import { AiService } from './ai.service'

@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: process.env.RMQ_URI as string,
    }),
  ],
  controllers: [AiController],
  providers: [AiService, PrismaService, EventService],
  exports: [AiService],
})
export class AiModule {}
