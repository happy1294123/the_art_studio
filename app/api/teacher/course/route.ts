import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'TEACHER'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

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