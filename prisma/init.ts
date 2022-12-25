import { PrismaClient } from '@prisma/client'
import type { CreateProjectDto } from 'src/project/dto/create-project.dto'
import type { CreateUserDto } from 'src/user/dto/create-user.dto'

const prisma = new PrismaClient()

const main = async () => {
  const users: (CreateUserDto & { salt: string })[] = [
    {
      username: '114514',
      password: '1919810',
      salt: '1145141919810',
    },
  ]

  await prisma.user.createMany({
    data: users,
  })

  const projects: (CreateProjectDto & { userId: number })[] = [
    {
      name: 'test project',
      description: 'this is a test project',
      userId: 1,
    },
  ]

  await prisma.project.createMany({
    data: projects,
  })
}

main().finally(async () => {
  await prisma.$disconnect()
})
