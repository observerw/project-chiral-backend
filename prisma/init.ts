import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  const users = []
}

main().finally(async () => {
  await prisma.$disconnect()
})
