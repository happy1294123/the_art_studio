import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEXT_GOOGLE_API_KEY
  const placeid = 'ChIJQ18DdJOpQjQRGgiBfm9TunY'

  const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&placeid=${placeid}&language=zh-TW`)
  const data = await res.json()
  if (data.status === 'OK') {
    return NextResponse.json(data.result.reviews)
  }
  return NextResponse.json('', { status: 400 })
}