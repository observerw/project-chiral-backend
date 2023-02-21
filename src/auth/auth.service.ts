import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { plainToInstance } from 'class-transformer'
import { UserEntity } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'
import { encryptPassword } from 'src/utils/crypto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(username: string, password: string) {
    const user = await this.userService.getByUsername(username)
    if (!user) { return null }
    const { password: realPassword, salt, ...rest } = user
    const hashPassword = encryptPassword(password, salt)
    if (hashPassword === realPassword) { return plainToInstance(UserEntity, rest) }
    return null
  }

  async certificate(user: UserEntity) {
    return { access_token: this.jwtService.sign(user, { secret: process.env.JWT_SECRET }) }
  }
}
