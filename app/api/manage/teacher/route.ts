import prisma from "@/lib/initPrisma";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET() {
  const res = await prisma.user.findMany({
    where: {
      role: 'TEACHER'
    },
    select: {
      id: true,
      name: true,
      image: true
    }
  })

  return NextResponse.json(res)
}

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const { name, email } = await req.json()

  const res = await prisma.user.create({
    data: {
      name,
      email,
      password: '$2a$10$TnYMtT6KL15ELohndLZavOaf/fQOJhXGZeD1BHISMNR5cMEBwf/RW',
      role: 'TEACHER'
    }
  })

  if (!res.id) {
    return NextResponse.json('', { status: 400 })
  }
  return NextResponse.json('')
}



