import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/initPrisma";
import dateFormatter from '@/lib/dateFormatter'

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token || token.role !== 'ADMIN') return NextResponse.json('權限不足', { status: 401 })
  const data = await req.json()
  data.teacher_id = Number(data.teacher_id)
  data.date = dateFormatter(new Date(data.date))
  await prisma.course.create({
    data
  })



  return NextResponse.json('OK')
}

// name         String
// type String?
//   date         String
//   start_time   String
//   end_time     String
//   teacher      User @relation(fields: [teacher_id], references: [id])
//   teacher_id   Int
//   total_rez    Int @db.UnsignedSmallInt
//   baseline_rez Int @default (2)
//   point        Int @default (10)
//   price        Int @default (250)