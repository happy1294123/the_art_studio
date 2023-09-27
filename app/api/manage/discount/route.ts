import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/initPrisma";
import { revalidateTag } from "next/cache";

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const res = await prisma.discount.findMany()
  return NextResponse.json(res)
}

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const data = await req.json()
  if (!data.code || !data.description) {
    return NextResponse.json('請輸入折扣碼和描述訊息', { status: 422 })
  }

  const sameCode = await prisma.discount.findFirst({
    where: {
      code: data.code
    }
  })
  if (sameCode) {
    return NextResponse.json('折扣碼重複，請重新輸入折扣碼', { status: 422 })
  }
  const { id } = await prisma.discount.create({ data })
  if (id) {
    return NextResponse.json('')
  }

  return NextResponse.json('資料庫錯誤', { status: 502 })
}

export async function PUT(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const data = await req.json()
  if (!data.code || !data.description) {
    return NextResponse.json('請輸入折扣碼和描述訊息', { status: 422 })
  }

  const { id } = await prisma.discount.update({
    where: {
      id: data.id
    },
    data
  })
  if (id) {
    return NextResponse.json('')
  }

  return NextResponse.json('資料庫錯誤', { status: 502 })
}

export async function DELETE(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const id = new URL(req.url).searchParams.get('id') as string
  const res = await prisma.discount.delete({
    where: { id: parseInt(id) }
  })
  if (res.id) {
    revalidateTag('discount')
    return NextResponse.json('')
  }
}