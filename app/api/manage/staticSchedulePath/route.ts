import getStaticSchedulePath from "@/lib/course/getStaticSchedulePath";
import { NextResponse } from "next/server";

export async function GET() {
  const path = await getStaticSchedulePath()
  return NextResponse.json(path)
}