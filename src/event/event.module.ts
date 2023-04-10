import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { RabbitMQModule } from '@nestjs-plus/rabbitmq'
import { EventService } from './event.service'
import { EventController } from './event.controller'

@Module({
  imports: [RabbitMQModule.forRoot({
    uri: process.env.RMQ_URI as string,
    defaultRpcTimeout: 50000,
    defaultExchangeType: '',
  })],
  controllers: [EventController],
  providers: [EventService, PrismaService],
})
export class EventModule {}
