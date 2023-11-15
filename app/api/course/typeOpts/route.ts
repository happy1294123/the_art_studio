import { NextResponse } from "next/server";

export async function GET() {
  const types = await prisma.CourseType.findMany({
    select: {
      name: true
    }
  })

  const typeOptions = types.map((type: { name: string }) => ({ value: type.name, label: type.name }))

  return NextResponse.json(typeOptions)
}