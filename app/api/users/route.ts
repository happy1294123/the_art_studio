import { NextResponse } from 'next/server'
// import getAllDbData from '@/lib/getAllDbData'

export async function GET(request: Request) {
  // const users = await getAllDbData()
  return NextResponse.json('users')
}
