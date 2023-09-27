import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import prisma from "@/lib/initPrisma"
import { revalidateTag } from "next/cache"

export async function POST(req: any) {
  try {

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
    if (!newData) NextResponse.json('預約失敗', { status: 500 })
    revalidateTag('course')
    const result = {
      point: token.point
    }
    // 更新點數
    if (body.plan_name.startsWith('點數') && parseInt(body.plan_value) > 0) {
      const newUser = await prisma.user.update({
        where: {
          id: token.id
        },
        data: {
          point: { decrement: parseInt(body.plan_value) }
        }
      })
      result.point = newUser.point
    }

    // 記錄折扣碼
    if (body.discount_id) {
      await prisma.userDiscount.create({
        data: {
          user_id: token.id,
          discount_id: body.discount_id
        }
      })
    }
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return NextResponse.json('未知錯誤', { status: 500 })
  }
}