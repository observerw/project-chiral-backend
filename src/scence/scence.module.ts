import { Module } from '@nestjs/common'
import { ScenceService } from './scence.service'
import { ScenceController } from './scence.controller'

@Module({
  controllers: [ScenceController],
  providers: [ScenceService],
})
export class ScenceModule {}
