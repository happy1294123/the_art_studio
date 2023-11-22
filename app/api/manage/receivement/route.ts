import prisma from "@/lib/initPrisma"
import { getToken } from "next-auth/jwt"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const res = await prisma.payment.findMany({
    orderBy: {
      created_at: 'desc'
    },
    include: {
      user: true
    }
  })
  return NextResponse.json(res)
}

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const { reply, payment_id } = await req.json()

  const findPayment = await prisma.payment.findFirst({
    where: {
      id: payment_id
    },
    include: {
      user: {
        select: {
          point: true,
          point_deadline: true
        }
      }
    }
  })

  if (!findPayment) {
    return NextResponse.json('查無匯款紀錄', { status: 400 })
  }
  if (findPayment?.state === 'SUCCESS') {
    return NextResponse.json('已經完成回覆', { status: 400 })
  }

  let addPoint = 0
  let userPointDeadline = findPayment.user.point_deadline || new Date()
  // 購買點數
  if (findPayment.category === 'POINT') {
    addPoint = parseInt(findPayment.name.slice(0, -1)) // remove'點'
    // 計算新點數期限
    userPointDeadline = getNewPointDeadline(userPointDeadline, addPoint)
  }

  // 單次購課
  if (findPayment.category === 'SINGLE' && findPayment.course_id) {
    await prisma.reservation.update({
      where: {
        course_id_user_id: {
          course_id: findPayment.course_id,
          user_id: findPayment.user_id
        }
      },
      data: {
        state: 'SUCCESS'
      }
    })
    revalidateTag('myReservation')

    userPointDeadline = getNewPointDeadline(userPointDeadline, '單堂')
  }

  const newUser = await prisma.user.update({
    where: {
      id: findPayment.user_id
    },
    data: {
      point: { increment: addPoint },
      point_deadline: userPointDeadline
    }
  })

  const res = await prisma.payment.update({
    where: {
      id: payment_id
    },
    data: {
      state: reply === 'success' ? 'SUCCESS' : 'ERROR',
      point_balance: newUser?.point
    }
  })

  if (!res.id) {
    return NextResponse.json('', { status: 400 })
  }

  revalidateTag('myPoint')
  revalidateTag('payment')
  return NextResponse.json('')
}

// 購買點數的延期天數
const getNewPointDeadline = (pointDeadline: Date, point: number | '單堂') => {
  // 單堂 1天
  // 35點 60天
  // 75點 120天
  // 150點 180天
  // 250點 270天
  let addDay = 0
  if (point === 35) {
    addDay = 60
  } else if (point === 75) {
    addDay = 120
  } else if (point === 150) {
    addDay = 100
  } else if (point === 250) {
    addDay = 270
  } else if (point === '單堂') {
    addDay = 1
  }

  const date = new Date(pointDeadline)
  date.setDate(date.getDate() + addDay)
  return date
}