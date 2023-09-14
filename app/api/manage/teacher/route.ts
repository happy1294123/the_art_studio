import prisma from "@/lib/initPrisma";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const res = await prisma.user.findMany({
    where: {
      role: 'TEACHER'
    },
    select: {
      id: true,
      name: true
    }
  })

  return NextResponse.json(res)
}




