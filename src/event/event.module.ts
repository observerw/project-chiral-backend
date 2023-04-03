import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { EventService } from './event.service'
import { EventController } from './event.controller'

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService],
})
export class EventModule {}
