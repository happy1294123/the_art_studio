import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import prisma from "@/lib/initPrisma"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })

  const res = await prisma.payment.findMany({
    where: {
      user_id: token.id
    },
    orderBy: {
      created_at: 'desc'
    }
  })

  return NextResponse.json(res)
}

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })

  const data = await req.json()

  if (!data.date || !data.price || !data.account) {
    return NextResponse.json('', { status: 400 })
  }

  const res = await prisma.payment.update({
    where: {
      id: data.paymentId
    },
    data: {
      receive_date: data.date,
      receive_price: +data.price,
      receive_account: data.account,
      receive_note: data.note,
      state: "CHECKING"
    }
  })

  if (!res.id) {
    return NextResponse.json('', { status: 400 })
  }
  return NextResponse.json('')
}

export async function DELETE(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })
  const payment_id = new URL(req.url).searchParams.get('id') as string

  const res = await prisma.payment.delete({
    where: {
      id: parseInt(payment_id)
    }
  })

  if (!res.id) {
    return NextResponse.json('', { status: 400 })
  }
  return NextResponse.json('')
}