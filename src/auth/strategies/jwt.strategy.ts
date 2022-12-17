import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import type { UserEntity } from 'src/user/entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: UserEntity) {
    // 只有签名成功通过jwt验证后才会调用这个方法，因此直接返回用户信息即可
    return payload
  }
}
