import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// 查找指定日期的課程
export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get('date') as string
  const prisma = new PrismaClient()
  console.log(prisma)
  const courses = await prisma.course.findMany({
    where: { date },
    orderBy: [{
      date: 'asc'
    }, {
      start_time: 'asc'
    }],
    include: {
      teacher: {
        select: {
          name: true,
          image: true
        }
      },
      Reservation: true
    }
  })
  console.log('courses', courses)

  return NextResponse.json(courses)
}
