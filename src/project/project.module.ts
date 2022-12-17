import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService],
  imports: [],
})
export class ProjectModule {}
