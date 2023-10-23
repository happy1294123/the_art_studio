import prisma from "@/lib/initPrisma"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import path from "path"
import fs, { writeFile } from "fs/promises";

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })

  const res = await prisma.user.findFirst({
    where: {
      id: token.id
    },
    select: {
      name: true,
      birth: true,
      image: true,
      phone: true,
      address: true,
      gender: true,
      medical: true,
      em_name: true,
      em_relation: true,
      em_phone: true
    }
  })

  return NextResponse.json(res)
}


export async function PUT(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })

  const data = await req.json()

  const res = await prisma.user.update({
    where: {
      id: token.id
    },
    data
  })

  return NextResponse.json(res)
}

// upload avatar image
export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })

  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json('', { status: 400 })
  }

  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const newPath = path.join(process.cwd(), 'public', 'avatar', String(token.id))
    await writeFile(newPath, buffer)
    return NextResponse.json('')
  } catch (error) {
    console.log(error)
    return NextResponse.json('', { status: 400 })
  }
}