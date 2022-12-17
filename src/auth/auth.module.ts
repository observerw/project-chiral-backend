import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
