import { NextResponse } from 'next/server'
import prisma from '@/lib/initPrisma'

// 查找指定日期的課程
export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get('date') as string
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

  return NextResponse.json(courses)
}

