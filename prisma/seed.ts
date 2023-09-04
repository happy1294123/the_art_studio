const users = require('./seeds/users')
const courses = require('./seeds/courses')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  for (let user of users) {
    await prisma.user.upsert({
      where: {
        email: user.email
      },
      update: {},
      create: user
    })
  }

  for (let course of courses) {
    await prisma.course.create({
      data: course
    })
  }
}

main().catch(e => {
  console.log(e)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})


