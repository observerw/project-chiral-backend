import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RequestContextModule } from 'nestjs-request-context'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './database/prisma/prisma.module'
import { ProjectModule } from './project/project.module'
import { UserModule } from './user/user.module'
import { CharacterModule } from './character/character.module'
import { ScenceModule } from './scence/scence.module'
import { BackdropModule } from './backdrop/backdrop.module'
import { EventModule } from './event/event.module'
import { CypherService } from './database/cypher/cypher.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RequestContextModule,
    EventModule,
    UserModule,
    AuthModule,
    ProjectModule,
    CharacterModule,
    ScenceModule,
    BackdropModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局启用 JWT Guard
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // 全局启用序列化拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    CypherService,
  ],
})
export class AppModule { }
