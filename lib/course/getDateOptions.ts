import { PrismaClient } from '@prisma/client'
import dateFormatter from '@/lib/dateFormatter'

export default async function getDateOptions() {
  const prisma = new PrismaClient()
  const coursesDate = await prisma.course.findMany({
    where: {
      date: {
        gte: dateFormatter()
      }
    },
    orderBy: {
      date: 'asc'
    },
    select: {
      date: true
    }
  })

  return coursesDate.map(d => d.date)
}
