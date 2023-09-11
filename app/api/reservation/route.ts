import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import prisma from "@/lib/initPrisma"
import { revalidateTag } from "next/cache"

export async function POST(req: any) {
  const body = await req.json()
  const token = await getToken({ req })
  if (!token) {
    return NextResponse.json('請先登入會員', { status: 401 })
  }
  const course = await prisma.course.findFirst({
    where: {
      id: body.course_id
    },
    include: {
      Reservation: true
    }
  })
  if (!course) {
    return NextResponse.json('查無該課程', { status: 422 })
  }
  if (course.Reservation.length >= course.total_rez) {
    return NextResponse.json('課程已額滿', { status: 422 })
  }
  if (course.Reservation.find(r => r.user_id === token.id)) {
    return NextResponse.json('課程已預約', { status: 422 })
  }
  const newData = await prisma.reservation.create({
    data: {
      course_id: body.course_id,
      user_id: token.id as number,
      plan_name: body.plan_name,
      plan_value: +body.plan_value
    }
  })
  revalidateTag('course')
  if (newData) return NextResponse.json(null, { status: 201 })
  return NextResponse.json('未知錯誤', { status: 500 })
}