import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/initPrisma";
import { revalidatePath } from "next/cache";
import dateFormatter from "@/lib/dateFormatter";

function copyCourse(sample: CreateCourse, date: Date): CreateCourse {
  return {
    name: sample.name,
    type: sample.type,
    date: dateFormatter(date),
    start_time: sample.start_time,
    end_time: sample.end_time,
    teacher_id: sample.teacher_id,
    total_rez: sample.total_rez,
    baseline_rez: sample.baseline_rez,
    point: sample.point,
    price: sample.price,
  }
}

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const data = await req.json()
  // console.log(data)
  const sampleCourses = await prisma.course.findMany({
    where: {
      id: { in: data.events.map((event: CourseEvent) => event.courseId) }
    }
  })
  // console.log(sampleCourses)
  const mutipleData: CreateCourse[] = []
  data.events.forEach((event: CourseEvent) => {
    const sampleCourse = sampleCourses.find(course => course.id === event.courseId) as CreateCourse
    const date = new Date(event.date)
    if (data.to === 'next_week') {
      const nextWeek = new Date(date.setDate(date.getDate() + 7))
      mutipleData.push(copyCourse(sampleCourse, nextWeek))
      // const dateMonth = date.getMonth()
      // const lastWeek = new Date(date.setDate(date.getDate() - 7))
      // while (lastWeek.getMonth() === dateMonth) {
      //   mutipleData.push(copyCourse(sampleCourse, lastWeek))
      //   lastWeek.setDate(lastWeek.getDate() - 7)
      // }

      // const newDate = new Date(event.date)
      // const nextWeek = new Date(newDate.setDate(newDate.getDate() + 7))
      // while (nextWeek.getMonth() === dateMonth) {
      //   mutipleData.push(copyCourse(sampleCourse, nextWeek))
      //   nextWeek.setDate(nextWeek.getDate() + 7)
      // }
    } else if (data.to === 'next_3week') {
      const nextWeek = new Date(date.setDate(date.getDate() + 7))
      mutipleData.push(copyCourse(sampleCourse, nextWeek))
      nextWeek.setDate(nextWeek.getDate() + 7)
      mutipleData.push(copyCourse(sampleCourse, nextWeek))
      nextWeek.setDate(nextWeek.getDate() + 7)
      mutipleData.push(copyCourse(sampleCourse, nextWeek))
    }
  });

  if (mutipleData) {
    const { count } = await prisma.course.createMany({
      data: mutipleData
    })
    if (count > 0) {
      revalidatePath('/course')
      return NextResponse.json(count)
    }
  }

  return NextResponse.json('無新增事件')
}