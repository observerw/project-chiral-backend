import { Body, Controller, Delete, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'
import { AuthService } from 'src/auth/auth.service'
import { Public } from 'src/auth/decorators/public.decorator'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UserLoginRespDto } from './dto/user-login-resp.dto'
import type { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getUser(@Request() { user }: { user: UserEntity }) {
    return user
  }

  @Delete()
  deleteUser(@Request() { user: { id } }: { user: UserEntity }) {
    return this.userService.deleteUser(id)
  }

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() { user }: { user: UserEntity }) {
    const result = this.authService.certificate(user)
    return plainToInstance(UserLoginRespDto, result)
  }

  @Public()
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto)
  }

  // TODO 增加手机登录功能
}
