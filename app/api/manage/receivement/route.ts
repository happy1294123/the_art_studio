import prisma from "@/lib/initPrisma"
import { getToken } from "next-auth/jwt"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

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
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const { reply, payment_id } = await req.json()
  const state = reply === 'success' ? 'SUCCESS' : 'ERROR'

  const res = await prisma.payment.update({
    where: {
      id: payment_id
    },
    data: {
      state
    }
  })

  if (!res.id) {
    return NextResponse.json('', { status: 400 })
  }

  // 購買點數
  if (!res.course_id) {
    const addPoint = parseInt(res.name.slice(0, -1))
    await prisma.user.update({
      where: {
        id: res.user_id
      },
      data: {
        point: { increment: addPoint }
      }
    })
    revalidateTag('myPoint')
  }

  // 單次購課
  if (res.course_id && res.user_id) {
    await prisma.reservation.update({
      where: {
        course_id_user_id: {
          course_id: res.course_id,
          user_id: res.user_id
        }
      },
      data: {
        state: 'SUCCESS'
      }
    })
    revalidateTag('myReservation')
  }

  revalidateTag('payment')
  return NextResponse.json('')
}