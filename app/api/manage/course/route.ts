import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/initPrisma";
import { revalidatePath } from "next/cache";

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const data = await req.json()
  delete data.id
  await prisma.course.create({ data })
  revalidatePath('/course')
  return NextResponse.json('OK')
}

export async function DELETE(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const id = await req.json()
  const reservationNum = await prisma.reservation.count({
    where: {
      course_id: id
    }
  })

  if (reservationNum > 0) {
    return NextResponse.json('已有預約，無法刪除', { status: 400 })
  }

  await prisma.course.delete({
    where: {
      id
    }
  })
  revalidatePath('/course')
  return NextResponse.json('OK')
}

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR', 'TEACHER'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const where = token.role === 'TEACHER' ? { teacher_id: token.id } : undefined

  const allCourses = await prisma.course.findMany({
    where,
    include: {
      teacher: true,
      Reservation: {
        include: {
          user: {
            select: {
              serial_number: true,
              name: true,
              medical: true
            }
          }
        }
      }
    }
  })

  return NextResponse.json(allCourses)
}

export async function PUT(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const data = await req.json()
  const res = await prisma.course.update({
    where: { id: data.id },
    data
  })
  revalidatePath('/course')

  return NextResponse.json(res)
}