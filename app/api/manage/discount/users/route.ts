import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/initPrisma";

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const discount_id = new URL(req.url).searchParams.get('discount_id') as string
  const res = await prisma.userDiscount.findMany({
    where: {
      discount_id: parseInt(discount_id)
    },
    include: {
      user: true,
    }
  })

  const simpleRes = res.map(r => ({
    name: r.user.name,
    email: r.user.email
  }))


  return NextResponse.json(simpleRes)
}