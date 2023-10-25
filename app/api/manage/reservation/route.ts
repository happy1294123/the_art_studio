import prisma from "@/lib/initPrisma"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const { user_id, point, course_id } = await req.json()
  const pointNum = parseInt(point)

  await prisma.reservation.create({
    data: {
      course_id,
      user_id,
      plan_name: `點數 ${point} 點`,
      plan_value: pointNum
    }
  })

  if (pointNum) {
    await prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        point: { decrement: pointNum }
      }
    })
  }

  return NextResponse.json('')
}