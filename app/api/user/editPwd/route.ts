import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/initPrisma";
import { compareSync, hashSync } from "bcryptjs";

export async function POST(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })

  const findUser = await prisma.user.findFirst({
    where: {
      email: token.email
    }
  })
  const formData = await req.json()
  const isOldPwdMatch = compareSync(formData.oldPwd, findUser?.password as string)
  if (!isOldPwdMatch) return NextResponse.json('舊密碼有誤', { status: 400 })

  const password = hashSync(formData.newPwd, 10)
  await prisma.user.update({
    where: {
      email: token.email
    },
    data: { password }
  })
  return NextResponse.json('')
}