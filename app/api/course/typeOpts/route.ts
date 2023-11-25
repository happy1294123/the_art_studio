import prisma from "@/lib/initPrisma";
import { NextResponse } from "next/server";
import prisma from '@/lib/initPrisma'

export async function GET() {
  const types = await prisma.courseType.findMany({
    select: {
      name: true
    }
  })

  const typeOptions = types.map((type: { name: string }) => ({ value: type.name, label: type.name }))

  return NextResponse.json(typeOptions)
}