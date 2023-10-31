import prisma from "@/lib/initPrisma"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const res = await prisma.user.findMany()

  return NextResponse.json(res)
}

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const data = await req.json()
  const newUser = await prisma.user.update({
    where: {
      id: data.id
    },
    data: {
      serial_number: data.serial_number,
      point: data.point,
      point_deadline: data.point_deadline,
      email_varified: data.email_varified,
      note: data.note,
    }
  })
  if (!newUser.id) {
    return NextResponse.json('', { status: 401 })
  }

  return NextResponse.json(newUser)
}