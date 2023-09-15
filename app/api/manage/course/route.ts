import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/initPrisma";
import { revalidatePath } from "next/cache";

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const data = await req.json()
  await prisma.course.create({ data })
  revalidatePath('/course')
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
  revalidatePath('/course')
  return NextResponse.json('OK')
}