'use client'
import { useState, useMemo, Suspense } from 'react'
import OneLineDatePicker from '@/components/course/datePicker/OneLineDatePicker'
import HalfScreenDatePicker from '@/components/course/datePicker/HalfScreenDatePicker'
import dateFormatter from '@/lib/dateFormatter'
import { Skeleton } from "@/components/ui/skeleton"
import CourseItems from '@/components/course/CourseItems'
import DateHeading from './DateHeading'
import { useSearchParams } from 'next/navigation'

type Props = {
  dateOptions: string[]
}

export default function CoursesShower({ dateOptions }: Props) {
  const today = dateFormatter()
  const dateSet = useMemo(() => (dateOptions.filter(d => d >= today)), [today, dateOptions])
  const date = useSearchParams().get('date')
  const [selectedDate, setSelectedDate] = useState(date ? new Date(date) : new Date())

  return (
    <>
      <div className="md:grid grid-cols-2 gap-8">
        <div className="hidden h-full md:block mx-auto">
          <HalfScreenDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} dateSet={dateSet} />
        </div>
        <div className="w-full">
          <OneLineDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} dateSet={dateSet} />
          <DateHeading date={selectedDate} />
          <Suspense fallback={[1, 2, 3].map(i => <CourseItemSkeleton key={i} />)}>
            <CourseItems selectedDate={selectedDate} />
          </Suspense >
        </div>
      </div >
    </>
  )
}

export const CourseItemSkeleton = () => {
  return (
    <div className=" mt-3 p-4 rounded-3xl mb-3 drop-shadow-lg border border-gray-300 shadow-md h-[120xpx] space-y-3">
      <div className="flex gap-4">
        <Skeleton className="w-[75px] h-3" />
        <Skeleton className="w-[60px] rounded-full" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-[140px] h-3" />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-[50px] h-3 my-auto" />
        </div>
        <div className="flex gap-2">
          <div className="flex mt-auto">
            <Skeleton className="w-[60px] h-[30px] rounded-full" />
          </div>
        </div>
      </div>
    </div >
  )
}
