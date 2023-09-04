import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import dateFormatter from '@/lib/dateFormatter'

export async function GET() {
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

  return NextResponse.json([...new Set(coursesDate.map(c => c.date))])
}

