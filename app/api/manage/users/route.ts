import prisma from "@/lib/initPrisma"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const res = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      role: true,
      point: true,
      note: true,
    }
  })

  return NextResponse.json(res)
}