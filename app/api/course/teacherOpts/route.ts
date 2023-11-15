import prisma from "@/lib/initPrisma";
import { NextResponse } from "next/server";

export async function GET() {
  const teachers = await prisma.user.findMany({
    where: {
      role: 'TEACHER'
    },
    select: {
      id: true,
      name: true
    }
  })

  const teacherOptions = teachers.map(teacher => ({ value: teacher.id, label: teacher.name }))

  return NextResponse.json(teacherOptions)
}