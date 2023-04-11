import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RequestContextModule } from 'nestjs-request-context'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { PrismaModule } from 'nestjs-prisma'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ProjectModule } from './project/project.module'
import { UserModule } from './user/user.module'
import { CharacterModule } from './character/character.module'
import { EventModule } from './event/event.module'
import { SceneModule } from './scene/scene.module'
import { WorldviewModule } from './worldview/worldview.module'
import { TaskService } from './task/task.service'
import { FileModule } from './file/file.module'
import { GraphModule } from './graph/graph.module'
import { CypherService } from './database/cypher/cypher.service'
import { AiModule } from './ai/ai.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    // RedisModule.forRoot({
    //   config: {
    //     url: process.env.REDIS_URL as string,
    //   },
    // }),
    ScheduleModule.forRoot(),
    RequestContextModule,
    EventModule,
    UserModule,
    AuthModule,
    ProjectModule,
    CharacterModule,
    SceneModule,
    WorldviewModule,
    FileModule,
    GraphModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // JWT接口权限验证
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // 序列化拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    TaskService,
    CypherService,
  ],
})
export class AppModule { }
