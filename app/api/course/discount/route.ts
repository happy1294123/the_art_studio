import { getToken } from "next-auth/jwt";
import prisma from '@/lib/initPrisma'
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('權限不足', { status: 401 })
  const { code } = await req.json()
  const findCode = await prisma.discount.findFirst({
    where: { code }
  })
  if (!findCode) {
    return NextResponse.json('查無該折扣碼', { status: 422 })
  } else if (!findCode.active) {
    return NextResponse.json('折扣碼已失效', { status: 422 })
  }

  const findUsed = await prisma.userDiscount.findFirst({
    where: {
      AND: [{
        user_id: token.id
      }, {
        discount_id: findCode.id
      }]
    }
  })
  if (findUsed) {
    return NextResponse.json('折扣碼已經使用過了', { status: 422 })
  }

  return NextResponse.json({
    discount_id: findCode.id,
    description: findCode.description,
    point_discount: findCode.point_discount,
    price_discount: findCode.price_discount
  })
}