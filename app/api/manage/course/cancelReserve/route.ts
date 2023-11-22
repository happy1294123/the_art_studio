import { getToken } from "next-auth/jwt"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import prisma from '@/lib/initPrisma'

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const { course_id, user_id, returnPoint } = await req.json()
  console.log(course_id, user_id, returnPoint);

  const foundCourse = await prisma.course.findFirst({
    where: {
      id: course_id
    },
    select: {
      date: true,
      start_time: true
    }
  })

  if (!foundCourse) return NextResponse.json('查無該課程', { status: 400 })

  const startCourseTime = (new Date(`${foundCourse.date} ${foundCourse.start_time}`)).getTime()
  const nowTime = (new Date()).getTime() as number

  if (startCourseTime <= nowTime) return NextResponse.json('無法取消過去的預約', { status: 400 })

  const stateTo = Math.abs(nowTime - startCourseTime) / 36e5 <= 3 ? 'CANCEL' : 'delete row'

  if (stateTo === 'delete row') {
    await prisma.reservation.delete({
      where: {
        course_id_user_id: {
          course_id,
          user_id
        }
      }
    })
    await prisma.payment.deleteMany({
      where: {
        AND: [
          { course_id },
          { user_id }
        ]
      }
    })
  } else if (stateTo === 'CANCEL') {
    await prisma.reservation.update({
      where: {
        course_id_user_id: {
          course_id,
          user_id
        }
      },
      data: {
        state: 'CANCEL'
      }
    })
  }

  if (returnPoint > 0) {
    await prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        point: { increment: returnPoint }
      }
    })
  }

  await prisma.cancelLog.create({
    data: {
      course_id,
      user_id,
      stateTo,
      returnPoint
    }
  })

  revalidateTag('course')

  return NextResponse.json('')
}