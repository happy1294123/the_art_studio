import { NextResponse } from "next/server"
import prisma from '@/lib/initPrisma'

export async function GET() {
  const allType = await prisma.courseType.findMany()

  return NextResponse.json(allType)
}