import { getDetails } from "@/app/api/user/point/detail/route"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');
  if (!user_id) return NextResponse.json('請填入使用者id', { status: 401 })

  const details = await getDetails(parseInt(user_id))

  return NextResponse.json(details)
}