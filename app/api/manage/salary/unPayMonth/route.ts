import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function PUT(req: any) {
  const token = await getToken({ req })
  if (!token || token.role !== 'ADMIN') return NextResponse.json('權限不足', { status: 401 })

  const { teacher_id, unPayMonth } = await req.json()
  const res = await prisma.salary.update({
    where: { teacher_id },
    data: { unPayMonth }
  })

  if (res.teacher_id) {
    return NextResponse.json('')
  }

  return NextResponse.json('', { status: 400 })
}