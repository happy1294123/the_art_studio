import prisma from "@/lib/initPrisma"
import { getToken } from "next-auth/jwt"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })

  const res = await prisma.user.findFirst({
    where: {
      id: token.id
    },
    select: {
      point: true,
      point_deadline: true
    }
  })
  return NextResponse.json(res)
}

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })

  const { point, price } = await req.json()
  try {
    const res = await prisma.payment.create({
      data: {
        user_id: token.id,
        name: `${point}點`,
        price,
        category: 'POINT'
      }
    })
    revalidateTag('unPayNum')
    return NextResponse.json(res.id)
  } catch (error) {
    console.log(error);
    return NextResponse.json('', { status: 400 })
  }
}