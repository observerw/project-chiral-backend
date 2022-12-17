import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { encryptPassword, generateSalt } from 'src/utils/crypto'
import type { CreateUserDto } from './dto/create-user.dto'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(id: number) {
    const result = await this.prismaService.user.findUnique({
      where: { id },
    })

    return plainToInstance(UserEntity, result)
  }

  async getUserByUsername(username: string) {
    const result = await this.prismaService.user.findUnique({
      where: { username },
    })

    return plainToInstance(UserEntity, result)
  }

  async deleteUser(id: number) {
    const result = await this.prismaService.user.delete({
      where: { id },
    })

    return plainToInstance(UserEntity, result)
  }

  async getAllUsers() {
    const users = await this.prismaService.user.findMany()
    return users.map(user => plainToInstance(UserEntity, user))
  }

  async createUser(dto: CreateUserDto) {
    const salt = generateSalt()
    const password = encryptPassword(dto.password, salt)

    const result = this.prismaService.user.create({
      data: {
        ...dto,
        salt,
        password,
      },
    })

    return plainToInstance(UserEntity, result)
  }
}
