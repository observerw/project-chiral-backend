import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RequestContextModule } from 'nestjs-request-context'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { PrismaModule } from 'nestjs-prisma'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
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
    PrismaModule.forRoot({
      isGlobal: true,
    }),
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
    // prisma的异常转换
    // {
    //   provide: APP_FILTER,
    //   useClass: PrismaClientExceptionFilter,
    // },
  ],
})
export class AppModule { }
