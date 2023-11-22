import { NextResponse } from "next/server"

export async function GET() {
  const allType = await prisma.courseType.findMany()
  console.log('fetch type......');

  return NextResponse.json(allType)
}