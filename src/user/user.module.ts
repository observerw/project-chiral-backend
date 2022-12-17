import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/database/prisma/prisma.module'
import { AuthService } from 'src/auth/auth.service'
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
  exports: [UserService],
})
export class UserModule {}
