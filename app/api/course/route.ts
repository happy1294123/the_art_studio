import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get('date') as string
  const prisma = new PrismaClient()
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
    }
  })

  return NextResponse.json(courses)
}
