import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/initPrisma";

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token || token.role !== 'TEACHER') return NextResponse.json('權限不足', { status: 401 })

  const allCourses = await prisma.course.findMany({
    where: {
      teacher_id: token.id
    },
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