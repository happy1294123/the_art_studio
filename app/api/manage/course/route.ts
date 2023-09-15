import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/initPrisma";
import dateFormatter from '@/lib/dateFormatter'

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const data = await req.json()
  data.date = dateFormatter(new Date(data.date))
  await prisma.course.create({
    data
  })

  return NextResponse.json('OK')
}

export async function DELETE(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const id = await req.json()
  await prisma.course.delete({
    where: {
      id
    }
  })
  return NextResponse.json('OK')
}