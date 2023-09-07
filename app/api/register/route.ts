import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const formData = await req.formData()
  // password not confired
  if (formData.get('password') !== formData.get('confirmPassword')) {
    return NextResponse.json({
      name: 'confirmPassword',
      message: '密碼不一致'
    }, { status: 422 })
  }

  // password length > 6
  if ((formData.get('password') as string).length < 6) {
    return NextResponse.json({
      name: 'password',
      message: '密碼小於6個字元'
    }, { status: 422 })
  }

  // email duplicate
  try {
    const prisma = new PrismaClient()
    const isEmailDup = await prisma.user.findFirst({
      where: {
        email: formData.get('email') as string
      }
    })
    if (isEmailDup) {
      return NextResponse.json({
        name: 'email',
        message: '該電子郵件已被申請過'
      }, { status: 422 })
    }

    // create user
    const password = await bcrypt.hash(formData.get('password') as string, 10)
    const newUser = await prisma.user.create({
      data: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password
      }
    })
    if (newUser.id) {
      // TODO send email
      return NextResponse.json({}, { status: 201 })
    } else {
      return NextResponse.json({
        name: 'database',
        message: '資料庫錯誤，請重試'
      }, { status: 500 })
    }
  } catch (e) {
    return NextResponse.json({
      name: 'database',
      message: '資料庫錯誤，請重試'
    }, { status: 500 })
  }
}
