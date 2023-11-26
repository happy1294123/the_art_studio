import { MyReservation } from '@/type'
import React from 'react'
import useSWR from 'swr'
import DateHeading from '@/components/course/DateHeading'
import CourseItem from '@/components/course/CourseItem'
import Link from 'next/link'
import { CourseItemSkeleton } from '@/components/course/CoursesShower'
import { IoIosArrowForward } from 'react-icons/io'
import { Button } from "@/components/ui/button"

const fetcher = async (url: string) => fetch(url).then(res => res.json())

export default function UserCourseTabContent() {
  const { data: reservations, mutate: mutateReservation } = useSWR<Record<string, MyReservation[]>>(
    '/api/user/course',
    fetcher,
    // {
    //   revalidateIfStale: false,
    //   revalidateOnFocus: false,
    //   revalidateOnReconnect: false,
    // }
  )

  return (
    <div>
      {reservations && (<>{Object.keys(reservations).map(date => (
        <>
          <DateHeading date={new Date(date)} />
          {reservations[date as keyof typeof reservations].map((reservation, i) => (
            <CourseItem course={reservation['course']} isInUserPage={true} mutateReservation={mutateReservation} key={i} />
          ))}
        </>
      ))}
        {Object.keys(reservations).length > 0 && (
          <Link href="/course" className='text-headingColor float-right flex-center mb-1'>
            預約課程
            <IoIosArrowForward />
          </Link>
        )}
      </>)}
      {!reservations && Array(3).fill(<CourseItemSkeleton />)}

      {(reservations && Object.keys(reservations).length === 0)
        && (<><div className="flex-center">目前沒有預約課程</div>
          < div className='flex-center mt-2'>
            <Button className="mx-auto"><Link href="/course">前往預約</Link></Button>
          </div>
        </>)
      }
    </div>
  )
}
