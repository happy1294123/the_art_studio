import prisma from "@/lib/initPrisma";
import { getToken } from "next-auth/jwt";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const courseType = await prisma.courseType.findMany()
  return NextResponse.json(courseType)
}

export async function PUT(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const updateData = await req.json()
  for (let id in updateData) {
    await prisma.courseType.update({
      where: {
        id: parseInt(id)
      },
      data: {
        color: updateData[id]
      }
    })
  }

  return NextResponse.json('')
}

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const data = await req.json()
  await prisma.courseType.createMany({
    data
  })
  revalidateTag('courseType')
  return NextResponse.json('')
}

export async function DELETE(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const deleteAry = await req.json()

  deleteAry.forEach(async (id: number) => {
    await prisma.courseType.delete({
      where: { id }
    })
  });

  revalidateTag('courseType')
  return NextResponse.json('')
}