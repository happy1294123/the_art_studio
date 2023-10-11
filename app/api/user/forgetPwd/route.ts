import { NextResponse } from "next/server"
import prisma from "@/lib/initPrisma"
import sendForgetPwd from '@/lib/sendForgetPwd'

export async function POST(req: Request) {
  const email = await req.json()
  const user = await prisma.user.findFirst({
    where: { email }
  })
  if (!user) return NextResponse.json('', { status: 400 })
  await sendForgetPwd(email)
  return NextResponse.json('')
}
