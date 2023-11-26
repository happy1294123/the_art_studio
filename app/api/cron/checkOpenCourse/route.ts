import dateFormatter from "@/lib/dateFormatter";
import prisma from "@/lib/initPrisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  console.log('test cron');


  return Response.json({ success: true });
  // const now = new Date()
  // const tomorrow = now.setDate(now.getDate() + 1)

  // const tomorrowString = dateFormatter(new Date(tomorrow), '/', true)

  // const tomorrowCourses = await prisma.course.findMany({
  //   where: {
  //     date: tomorrowString
  //   },
  //   select: {
  //     id: true,
  //     date: true,
  //     start_time: true,
  //     end_time: true,
  //     baseline_rez: true,
  //     isOpen: true,
  //   }
  // })

  // const checkCourse = tomorrowCourses.filter(course => {
  //   const start = new Date(`${course.date} ${course.start_time}`).getTime()
  //   const end = new Date(`${course.date} ${course.end_time}`).getTime()
  //   return start < tomorrow && tomorrow < end
  // })

  // if (checkCourse.length > 1) {
  //   console.log('發生錯誤，同時段有兩個課程');
  //   return NextResponse.json('發生錯誤，同時段有兩個課程', { status: 400 })
  // }

  // if (checkCourse.length === 0) {
  //   console.log('24小時後無課程');
  //   return NextResponse.json('24小時後無課程', { status: 400 })
  // }

  // // to be confirmed course
  // const tbcCourse = checkCourse[0]
  // const reservationNum = await prisma.reservation.count({
  //   where: {
  //     course_id: tbcCourse.id
  //   }
  // })

  // let isOpen: boolean
  // if (reservationNum < tbcCourse.baseline_rez) { // 確定開課
  //   isOpen = false
  // } else {
  //   // make notify
  //   isOpen = true
  // }

  // await prisma.course.update({
  //   where: {
  //     id: tbcCourse.id
  //   },
  //   data: {
  //     isOpen
  //   }
  // })

  // return NextResponse.json(checkCourse)
}