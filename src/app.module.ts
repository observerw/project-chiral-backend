import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RequestContextModule } from 'nestjs-request-context'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { PrismaModule } from 'nestjs-prisma'
import { RabbitMQModule } from '@nestjs-plus/rabbitmq'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ProjectModule } from './project/project.module'
import { UserModule } from './user/user.module'
import { CharacterModule } from './character/character.module'
import { EventModule } from './event/event.module'
import { CypherService } from './database/cypher/cypher.service'
import { SceneModule } from './scene/scene.module'
import { WorldviewModule } from './worldview/worldview.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
        ],
      },
    }),
    RabbitMQModule.forRoot({
      uri: process.env.RMQ_URI as string,
    }),
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URL as string,
      },
    }),
    RequestContextModule,
    EventModule,
    UserModule,
    AuthModule,
    ProjectModule,
    CharacterModule,
    SceneModule,
    WorldviewModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CypherService,
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
  ],
})
export class AppModule { }
