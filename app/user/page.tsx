'use client'
import DateHeading from '@/components/course/DateHeading'
import CourseItem from '@/components/course/CourseItem'
import TheTitle from '@/components/TheTitle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import UserDropDownMenu from '@/components/user/UserDropDownMenu'
import useSWR from 'swr'
import { CourseItemSkeleton } from '@/components/course/CoursesShower'
import Link from 'next/link'
import UserPointTabContent from '@/components/user/UserPointTabContent'
import { useRouter, useSearchParams } from 'next/navigation'
import { Payment } from '@prisma/client'
import { Reservation } from '@/type'
import UserPaymentTabContent from '@/components/user/UserPaymentTabContent'
import { useEffect, useState } from 'react'

async function myCourseFetcher(url: string): Promise<Record<string, Reservation[]>> {
  const res = await fetch(url, { next: { tags: ['myReservation'] } })
  return await res.json()
}

async function myPointFetcher(url: string): Promise<{ point: number, point_deadline: Date }> {
  const res = await fetch(url, { next: { tags: ['myPoint'] } })
  return await res.json()
}

async function myPaymentFetcher(url: string): Promise<Payment[]> {
  const res = await fetch(url, { next: { tags: ['payment'] } })
  return await res.json()
}

async function unPayNumFetcher(url: string): Promise<number> {
  const res = await fetch(url, { next: { tags: ['unPayNum'] } })
  return await res.json()
}

export default function UserPage() {
  const [tab, setTab] = useState('course')
  const params = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    if (params.get('tab')) {
      const tab = params.get('tab') as string
      setTab(tab)
    }
  }, [params])

  const { data: reservations, mutate: mutateReservation } = useSWR(
    tab === 'course' && '/api/user/course',
    myCourseFetcher
  )

  const { data: point } = useSWR(
    tab === 'point' && '/api/user/point',
    myPointFetcher
  )

  const { data: payments, mutate: mutatePayment } = useSWR(
    tab === 'payment' && '/api/user/payment',
    myPaymentFetcher
  )

  const { data: unPayNum, mutate: mutateUnPayNum } = useSWR(
    '/api/user/payment?unPay=1',
    unPayNumFetcher
  )

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex justify-between -mt-5">
        <TheTitle>個人頁面</TheTitle>
        <div className="flex mt-8">
          <UserDropDownMenu />
        </div>
      </div>
      <Tabs value={tab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="course" onClick={() => router.push('/user?tab=course')}>課表</TabsTrigger>
          <TabsTrigger value="point" onClick={() => router.push('/user?tab=point')}>點數</TabsTrigger>
          <TabsTrigger value="payment" onClick={() => router.push('/user?tab=payment')}>
            匯款記錄
            {(typeof unPayNum === 'number' && unPayNum !== 0) && <div className='text-xs -mr-5 -mt-5 -ml-1  outline-2 outline-bgColorSecondary bg-primary rounded-full w-4 h-4 text-white'>{unPayNum}</div>}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="course">
          {reservations && Object.keys(reservations).map(date => (
            <>
              <DateHeading date={new Date(date)} />
              {reservations[date as keyof typeof reservations].map((reservation, i) => (
                <CourseItem course={reservation['course']} isInUserPage={true} mutateReservation={mutateReservation} key={i} />
              ))}
            </>
          ))}
          {!reservations && [1, 2, 3].map(i => (
            <CourseItemSkeleton key={i} />
          ))}

          {(reservations && Object.keys(reservations).length === 0)
            && (<><div className="flex-center">目前沒有預約課程</div>
              <div className='flex-center mt-2'>
                <Button className="mx-auto"><Link href="/course">前往預約</Link></Button>
              </div>
            </>)
          }
        </TabsContent >
        <TabsContent value="point">
          <UserPointTabContent myPoint={point} mutateUnPayNum={mutateUnPayNum} />
        </TabsContent>
        <TabsContent value="payment">
          <UserPaymentTabContent payments={payments} mutatePayment={mutatePayment} mutateUnPayNum={mutateUnPayNum} />
        </TabsContent>
      </Tabs >
    </div >
  )
}
