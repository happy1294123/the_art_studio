import { getToken } from "next-auth/jwt";
import prisma from "@/lib/initPrisma";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })
  const user_id = token.id as number
  const reservations = await prisma.reservation.findMany({
    where: {
      AND: [
        { user_id },
        {
          state: {
            not: 'CANCEL'
          }
        }
      ]
    },
    orderBy: {
      course: {
        date: 'asc'
      }
    },
    include: {
      course: {
        include: {
          Reservation: true,
          teacher: true,
          Payment: true
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

  const { course_id, stateTo, returnPoint } = await req.json()

  if (stateTo === 'delete row') {
    await prisma.reservation.delete({
      where: {
        course_id_user_id: {
          course_id,
          user_id: token.id
        }
      }
    })
    await prisma.payment.deleteMany({
      where: {
        AND: [
          { course_id },
          { user_id: token.id }
        ]
      }
    })
  } else if (stateTo === 'CANCEL') {
    await prisma.reservation.update({
      where: {
        course_id_user_id: {
          course_id,
          user_id: token.id
        }
      },
      data: {
        state: 'CANCEL'
      }
    })
  }

  const point = token.point + returnPoint
  if (returnPoint > 0) {
    await prisma.user.update({
      where: {
        id: token.id
      },
      data: {
        point
      }
    })
  }

  await prisma.cancelLog.create({
    data: {
      course_id,
      user_id: token.id as number,
      stateTo,
      returnPoint
    }
  })
  return NextResponse.json(point)
}

