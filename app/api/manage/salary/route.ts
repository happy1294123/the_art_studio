import dateFormatter from "@/lib/dateFormatter"
import prisma from "@/lib/initPrisma"
import { SalaryOldRecord } from "@prisma/client"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token || !['ADMIN', 'TEACHER'].includes(token.role)) return NextResponse.json('權限不足', { status: 401 })

  const month = new URL(req.url).searchParams.get('month') as string //2023/11
  const whereId = token.role === 'TEACHER' ? token.id : undefined

  const salary = await prisma.user.findMany({
    where: {
      role: 'TEACHER',
      id: whereId
    },
    select: {
      id: true,
      name: true,
      Course: {
        where: {
          date: {
            startsWith: month
          }
        },
        orderBy: [
          { date: 'asc' },
          { start_time: 'asc' }
        ],
        include: {
          Reservation: {
            include: {
              user: true
            }
          }
        }
      },
      Salary: true,
      SalaryOldRecord: true
    },
  })

  salary.map(s => {
    if (s.SalaryOldRecord.length && month) {
      const targetDate = new Date(month)
      let selectedRecord: SalaryOldRecord | undefined
      let distance = Infinity
      s.SalaryOldRecord.forEach(record => {
        const newDistance = new Date(record.due_to).getTime() - targetDate.getTime()
        if (newDistance >= 0 && newDistance <= distance) {
          selectedRecord = record
          distance = newDistance
        }
      })

      if (selectedRecord && s.Salary) {
        s.Salary.rule = selectedRecord.rule
        s.Salary.solid_price = selectedRecord.solid_price
        s.Salary.dynamic_add_price = selectedRecord.dynamic_add_price
        s.Salary.dynamic_baseline_price = selectedRecord.dynamic_baseline_price
        s.Salary.pay_account = selectedRecord.pay_account
        s.Salary.pay_method = selectedRecord.pay_method
      }
    }
  })

  return NextResponse.json(salary)
}

export async function PUT(req: any) {
  const token = await getToken({ req })
  if (!token || token.role !== 'ADMIN') return NextResponse.json('權限不足', { status: 401 })

  const data = await req.json()

  if (!data.rule) {
    data.rule = null
  } else if (data.rule === 'SOLID') {
    data.solid_price = parseInt(data.solid_price)
    data.dynamic_baseline_price = 0
    data.dynamic_add_price = 0
  } else if (data.rule === 'DYNAMIC') {
    data.dynamic_baseline_price = parseInt(data.dynamic_baseline_price)
    data.dynamic_add_price = parseInt(data.dynamic_add_price)
    data.solid_price = 0
  }

  const findSalary = await prisma.salary.findFirst({
    where: {
      teacher_id: data.teacher_id
    }
  })

  const nowMonth = dateFormatter().slice(0, 7)

  if (findSalary) {
    const createTime = findSalary?.created_month
    if (createTime !== nowMonth) {
      const lastMonth = new Date().setMonth(new Date().getMonth() - 1)
      const oldData = {
        rule: findSalary.rule,
        solid_price: findSalary.solid_price,
        dynamic_baseline_price: findSalary.dynamic_baseline_price,
        dynamic_add_price: findSalary.dynamic_add_price,
        pay_method: findSalary.pay_method,
        pay_account: findSalary.pay_account,
        due_to: dateFormatter(new Date(lastMonth)).slice(0, 7),
        salaryTeacher_id: findSalary.teacher_id
      }
      await prisma.salaryOldRecord.create({ data: oldData })
    }
  } else {
    data.unPayMonth = nowMonth
  }
  data.created_month = nowMonth

  // 更新或新增當月資訊
  const res = await prisma.salary.upsert({
    where: {
      teacher_id: data.teacher_id
    },
    update: data,
    create: data,
  })

  return returnResult(res)
}

const returnResult = (res: any) => {
  if (res) {
    return NextResponse.json(res)
  }
  return NextResponse.json('', { status: 400 })
}