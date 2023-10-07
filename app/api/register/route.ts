import { NextResponse } from 'next/server'
import prisma from '@/lib/initPrisma'
import bcrypt from 'bcryptjs'
import sendVarifyMail from '@/lib/sendVarifyMail'

export async function POST(req: Request) {
  const { name, email, password, confirmPassword } = await req.json()
  // name require
  if (!name) {
    return NextResponse.json({
      name: 'name',
      message: '名稱是必填欄位'
    }, { status: 422 })
  }

  // email require
  if (!email) {
    return NextResponse.json({
      name: 'email',
      message: '電子郵件是必填欄位'
    }, { status: 422 })
  }

  // password not confired
  if (password !== confirmPassword) {
    return NextResponse.json({
      name: 'confirmPassword',
      message: '密碼不一致'
    }, { status: 422 })
  }

  // password length > 6
  if (password.length < 6) {
    return NextResponse.json({
      name: 'password',
      message: '密碼小於6個字元'
    }, { status: 422 })
  }

  // email duplicate
  try {
    const isEmailDup = await prisma.user.findFirst({
      where: { email }
    })
    if (isEmailDup) {
      return NextResponse.json({
        name: 'email',
        message: '該電子郵件已被申請過'
      }, { status: 422 })
    }

    // create user
    const hashPassword = await bcrypt.hash(password as string, 10)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword
      }
    })
    if (newUser.id) {
      await sendVarifyMail(newUser.email)
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
