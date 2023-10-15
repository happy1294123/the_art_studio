import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })

  const course_id = parseInt(new URL(req.url).searchParams.get('course_id') as string)
  const res = await prisma.reservation.findFirst({
    where: {
      AND: [
        { course_id },
        { user_id: token.id as number }
      ]
    },
    include: {
      course: true
    }
  })
  // console.log(res);

  if (res.state === 'CANCEL') {
    return NextResponse.json({ type: 'alert', message: '此預約已經取消' })
  }

  // 單次
  if (res.plan_name.startsWith('單次') && res.state === 'SUCCESS') {
    return NextResponse.json({ type: 'alert', message: '無法處理已匯款預約，請主動聯絡官方' })
  } else if (res.plan_name.startsWith('單次') && res.state === 'PENDING') {
    return NextResponse.json({ stateTo: 'delete row', returnPoint: 0, message: '是否要取消預約？' })
  }

  // 點數
  const reservationTime = res?.created_at.getTime() as number
  const startCourseTime = (new Date(`${res?.course.date} ${res?.course.start_time}`)).getTime()
  const deltaHour = Math.abs(reservationTime - startCourseTime) / 36e5
  if (deltaHour > 24) {
    return NextResponse.json({ stateTo: 'delete row', returnPoint: res.plan_value, message: '可全額退還點數，是否要取消預約？' })
  } else if (deltaHour > 3 && deltaHour <= 24) {
    return NextResponse.json({ stateTo: 'PENDING', returnPoint: 0, message: '不可退還點數，但可更改預約時段，是否要取消預約？（待討論）' })
  } else {
    return NextResponse.json({ stateTo: 'CANCEL', returnPoint: 0, message: '不可退還點數，是否要取消預約？' })
  }
}