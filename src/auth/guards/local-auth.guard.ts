import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * 对用户密码进行验证，验证成功后将用户信息作为request.user传递到Controller中
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
