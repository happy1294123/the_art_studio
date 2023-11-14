import prisma from "@/lib/initPrisma"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'TEACHER'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const month = new URL(req.url).searchParams.get('month') as string //2023/11
  const whereId = token.role === 'TEACHER' ? token.id : undefined

  const salary = await prisma.user.findMany({
    where: {
      role: 'TEACHER',
      id: whereId
    },
    select: {
      id: true,
      name: true,
      Course: {
        where: {
          date: {
            startsWith: month
          }
        },
        include: {
          Reservation: {
            include: {
              user: true
            }
          }
        }
      },
      Salary: true
    },
  })
  return NextResponse.json(salary)
}

export async function PUT(req: any) {
  const token = await getToken({ req })
  if (!token || token.role !== 'ADMIN') return NextResponse.json('權限不足', { status: 401 })

  const data = await req.json()
  const id = data.teacher_id as number
  delete data.teacher_id

  const res = await prisma.salary.update({
    where: { teacher_id: id },
    data
  })

  if (res.teacher_id) {
    return NextResponse.json(res)
  }

  return NextResponse.json('', { status: 400 })
}