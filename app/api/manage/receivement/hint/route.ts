import prisma from "@/lib/initPrisma";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await prisma.payment.count({
    where: {
      state: 'CHECKING'
    }
  })

  return NextResponse.json(res)
}