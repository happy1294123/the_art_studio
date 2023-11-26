import prisma from '@/lib/initPrisma'
import dateFormatter from '@/lib/dateFormatter'

export default async function getDateOptions() {
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
