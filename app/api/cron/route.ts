import dateFormatter from "@/lib/dateFormatter";
import prisma from "@/lib/initPrisma";
import { NextResponse } from "next/server";
// import { headers } from 'next/headers';

// export const revalidate = 0
export const dynamic = "force-dynamic"

export async function GET() {
  // const headersList = headers();
  const now = new Date()
  if (now.getTimezoneOffset() !== -480) {
    now.setUTCHours(now.getUTCHours() + 8);
  }

  const tomorrow = now.setDate(now.getDate() + 1)

  const tomorrowString = dateFormatter(new Date(tomorrow), '/', true)

  const tomorrowCourses = await prisma.course.findMany({
    where: {
      date: tomorrowString
    },
    select: {
      id: true,
      date: true,
      start_time: true,
      end_time: true,
      baseline_rez: true,
      isOpen: true,
    }
  })

  const checkCourse = tomorrowCourses.filter(course => {
    const start = new Date(`${course.date} ${course.start_time}`).getTime()
    const end = new Date(`${course.date} ${course.end_time}`).getTime()
    return start < tomorrow && tomorrow < end
  })

  if (checkCourse.length > 1) {
    console.log('發生錯誤，同時段有兩個課程');
    return NextResponse.json('發生錯誤，同時段有兩個課程', { status: 400 })
  }

  if (checkCourse.length === 0) {
    console.log('24小時後無課程');
    return NextResponse.json('24小時後無課程' + now, { status: 202 })
  }

  // to be confirmed course
  const tbcCourse = checkCourse[0]
  const reservation = await prisma.reservation.findMany({
    where: {
      course_id: tbcCourse.id
    }
  })

  let isOpen = true
  if (reservation.length < tbcCourse.baseline_rez) {
    // TODO 返回點數，通知用戶
    // TODO 若有用單次購客的用戶，如何通知管理員
    isOpen = false
  }

  await prisma.course.update({
    where: {
      id: tbcCourse.id
    },
    data: {
      isOpen
    }
  })

  return NextResponse.json(checkCourse)
}