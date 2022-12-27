import { PrismaClient } from '@prisma/client'
import { UnitID } from '@project-chiral/unit-system'
import type { CreateProjectDto } from 'src/project/dto/create-project.dto'
import type { CreateUserDto } from 'src/user/dto/create-user.dto'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.user.deleteMany()
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

  await prisma.project.deleteMany()
  const projects: (CreateProjectDto & { userId: number })[] = [
    {
      name: 'test project',
      description: 'this is a test project',
      userId: 1,

      workspace: {
        origin: UnitID.fromDayjs(new Date(), 'month').serialize(),
        layout: [],
      },

      settings: {
        darkMode: false,
      },
    },
  ]
  await Promise.all(projects.map(({ workspace, settings, ...rest }) => prisma.project.create({
    data: {
      ...rest,
      workspace: {
        create: {
          ...workspace,
          layout: workspace.layout as object[],
        },
      },
      settings: {
        create: settings,
      },
    },
  })))
}

main().finally(async () => {
  await prisma.$disconnect()
})
