import prisma from "@/lib/initPrisma"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: any) {
  const token = await getToken({ req })
  if (!token) return NextResponse.json('請先登入會員', { status: 401 })

  const myPayments = await prisma.payment.findMany({
    where: {
      AND: [
        { user_id: token.id },
        { category: 'POINT' }
      ]
    },
    select: {
      name: true,
      created_at: true
    }
  })

  const paymentDetail = myPayments.map(p => ({ title: '購買點數', point: `+${p.name.replace('點', '')}`, created_at: p.created_at }))

  const myReservations = await prisma.reservation.findMany({
    where: {
      AND: [
        { user_id: token.id },
        { category: 'POINT' }
      ]
    },
    include: {
      course: {
        select: {
          name: true
        }
      }
    }
  })

  const reservationDetail = myReservations.map(r => ({ title: r.course.name, point: `-${r.plan_value}`, created_at: r.created_at }))

  const details = [
    ...paymentDetail,
    ...reservationDetail
  ].sort(function (a, b) {
    return b.created_at.getTime() - a.created_at.getTime()
  })






  // let pointDetails: { name: string | number, created_at: Date }[] = await prisma.$queryRaw`
  // SELECT name, created_at FROM payment WHERE user_id = ${token.id} AND category = 'POINT'
  // UNION
  // SELECT reservations.plan_value as name, reservations.created_at FROM reservations WHERE user_id = ${token.id} AND category = 'POINT' 
  // `

  // console.log(pointDetails);


  // if (pointDetails) {
  //   pointDetails = pointDetails.sort(function (a: { created_at: Date }, b: { created_at: Date }) {
  //     return b.created_at.getTime() - a.created_at.getTime()
  //   })
  //   pointDetails = pointDetails.map(detail => {
  //     const detailName = detail.name as string
  //     let name: number;
  //     if (detailName.includes('點')) {
  //       name = parseInt(detailName.replace('點', ''))
  //     } else {
  //       name = -parseInt(detailName)
  //     }
  //     return { name, created_at: detail.created_at }
  //   })
  // }

  return NextResponse.json(details)
}