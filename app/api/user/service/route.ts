import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/initPrisma";

const serviceType = [
  'apple',
  'google',
  'outlook',
  'outlookcom',
  'office365',
  'yahoo'
]

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })
  const service = await req.json()
  if (!service || !serviceType.includes(service)) return NextResponse.json('行事曆種類錯誤', { status: 422 })
  const newUser = await prisma.user.update({
    where: {
      id: token.id as number
    },
    data: {
      schedule_service: service
    }
  })
  if (newUser.schedule_service === service) return new Response(null, { status: 204 })

  return NextResponse.json('未知錯誤', { status: 500 })
}