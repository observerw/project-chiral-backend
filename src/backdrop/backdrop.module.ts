import { Module } from '@nestjs/common'
import { BackdropService } from './backdrop.service'
import { BackdropController } from './backdrop.controller'

@Module({
  controllers: [BackdropController],
  providers: [BackdropService],
})
export class BackdropModule {}
