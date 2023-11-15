'use client'
import { useState, useMemo, Suspense, useEffect } from 'react'
import OneLineDatePicker from '@/components/course/datePicker/OneLineDatePicker'
import HalfScreenDatePicker from '@/components/course/datePicker/HalfScreenDatePicker'
import dateFormatter from '@/lib/dateFormatter'
import { Skeleton } from "@/components/ui/skeleton"
import CourseItems from '@/components/course/CourseItems'
import DateHeading from './DateHeading'
import { useSearchParams } from 'next/navigation'
import FilterDialog from './FilterDialog'
import { MyCourseFilter } from '@/type'
import { ReserveContent } from '@/context/ReserveContent'

type Props = {
  dateOptions: string[],
  staticSchedulePath: string
}

export default function CoursesShower({ dateOptions, staticSchedulePath }: Props) {
  const today = dateFormatter()
  const dateSet = useMemo(() => (dateOptions.filter(d => d >= today)), [today, dateOptions])
  const id_date = useSearchParams().get('id_date')
  const [selectedDate, setSelectedDate] = useState(id_date ? new Date(id_date.split('_')[1]) : new Date())
  const [filter, setFilter] = useState<MyCourseFilter>({
    column: '',
    value: '',
    showText: '',
    isShow: false,
  })

  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0 })
    }
  }, [selectedDate, filter])

  return (
    <>
      <ReserveContent.Provider value={{ filter, setFilter, selectedDate, setSelectedDate, dateSet, staticSchedulePath }}>
        <div className="gap-8">
          <FilterDialog />
          <div className="w-full">
            <OneLineDatePicker />
            <DateHeading date={selectedDate} />
            <div className='flex gap-6'>
              <div className='hidden md:block col'>
                <HalfScreenDatePicker />
              </div>
              <div className="col w-full">
                <Suspense fallback={Array(3).fill(<CourseItemSkeleton />)}>
                  <CourseItems />
                </Suspense >
              </div>
            </div>
          </div>
        </div >
      </ReserveContent.Provider>
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
