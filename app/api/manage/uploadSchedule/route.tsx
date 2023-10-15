import fs, { writeFile } from "fs/promises";
import path from 'path'
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'EDITOR'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })
  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json('', { status: 400 })
  }

  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const dir = path.join(process.cwd(), 'public', 'static_schedule')
    for (const file of await fs.readdir(dir)) {
      await fs.unlink(path.join(dir, file))
    }

    const newPath = path.join(process.cwd(), 'public', 'static_schedule', file.name)
    await writeFile(newPath, buffer)

    return NextResponse.json('')
  } catch (error) {
    console.log(error)
    return NextResponse.json('', { status: 400 })
  }
}