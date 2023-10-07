import sendVarifyMail from '@/lib/sendVarifyMail';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json()
  const res = await sendVarifyMail(email)
  return NextResponse.json(res)
}