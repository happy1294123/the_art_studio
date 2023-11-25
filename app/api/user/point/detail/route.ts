import prisma from "@/lib/initPrisma"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })
  const details = await getDetails(token.id)

  return NextResponse.json(details)
}

export const getDetails = async (user_id: number) => {
  const myPayments = await prisma.payment.findMany({
    where: {
      AND: [
        { user_id },
        { category: 'POINT' },
        { state: 'SUCCESS' }
      ]
    },
    select: {
      name: true,
      point_balance: true,
      created_at: true
    }
  })

  const paymentDetail = myPayments.map(p => ({
    title: '購買點數',
    point: `+${p.name.replace('點', '')}`,
    balance: p.point_balance,
    created_at: p.created_at
  }))

  const myReservations = await prisma.reservation.findMany({
    where: {
      AND: [
        { user_id },
        { category: 'POINT' }
      ]
    },
    include: {
      course: {
        include: {
          teacher: {
            select: {
              name: true,
              image: true
            }
          },
        },
      }
    }
  })

  const reservationDetail = myReservations.map(r => ({
    title: r.course.name,
    teacherName: r.course.teacher.name,
    teacherImage: r.course.teacher.image,
    courseDate: r.course.date,
    courseStartTime: r.course.start_time,
    courseEndTime: r.course.end_time,
    courseType: r.course.type,
    balance: r.point_balance,
    point: `-${r.plan_value}`,
    created_at: r.created_at
  }))

  const details = [
    ...paymentDetail,
    ...reservationDetail
  ].sort(function (a, b) {
    return b.created_at.getTime() - a.created_at.getTime()
  })

  return details
}
