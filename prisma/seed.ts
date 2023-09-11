const users = require('./seeds/users')
const courses = require('./seeds/courses')
const relations = require('./seeds/relations')
import prisma from '@/lib/initPrisma'

async function main() {
  // user seeds
  for (let user of users) {
    await prisma.user.upsert({
      where: {
        email: user.email
      },
      update: {},
      create: user
    })
  }

  // course seeds
  for (let course of courses) {
    await prisma.course.create({
      data: course
    })
  }

  // reservation seeds
  for (let relation of relations) {
    await prisma.reservation.create({
      data: relation
    })
  }
}

main().catch(e => {
  console.log(e)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})


