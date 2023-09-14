import { getToken } from "next-auth/jwt";
import prisma from "@/lib/initPrisma";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })
  const user_id = token.id as number
  const reservations = await prisma.reservation.findMany({
    where: {
      user_id
    },
    orderBy: {
      course: {
        date: 'desc'
      }
    },
    include: {
      course: {
        include: {
          Reservation: true,
          teacher: true
        }
      },
    }
  })
  const groupData = reservations.reduce((group, reservation) => {
    const date: string = reservation.course.date
    group[date as keyof typeof group] = group[date as keyof typeof group] ?? [];
    (<typeof reservation[]>group[date as keyof typeof group]).push(reservation)
    return group
  }, {})
  return NextResponse.json(groupData)
}


// 刪除指定預約
export async function DELETE(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })

  // TODO 判斷取消標準是否符合
  const { course_id } = await req.json()
  const res = await prisma.reservation.deleteMany({
    where: {
      AND: [
        { course_id },
        { user_id: token.id as number }
      ]
    }
  })
  return NextResponse.json('')
}

