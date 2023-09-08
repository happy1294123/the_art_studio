import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

export async function GET() {
  const prisma = new PrismaClient()
  const coursesDate = await prisma.course.findMany()

  return NextResponse.json(coursesDate)
}
