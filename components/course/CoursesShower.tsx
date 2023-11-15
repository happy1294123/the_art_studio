'use client'
import { useState, useMemo, Suspense, useEffect } from 'react'
import OneLineDatePicker from '@/components/course/datePicker/OneLineDatePicker'
import HalfScreenDatePicker from '@/components/course/datePicker/HalfScreenDatePicker'
import dateFormatter from '@/lib/dateFormatter'
import { Skeleton } from "@/components/ui/skeleton"
import CourseItems from '@/components/course/CourseItems'
import DateHeading from './DateHeading'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import FilterDialog from './FilterDialog'
import { MyCourseFilter } from '@/type'
import { IoFilter } from 'react-icons/io5'

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
    isShow: false
  })

  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0)
    }
  }, [selectedDate, filter.isShow])

  return (
    <>
      <div className="gap-8">
        <div className='-mb-9 ml-[65px] z-10 w-fit'>
          <button onClick={() => setFilter({ ...filter, isShow: true })} className='hover:bg-fuchsia-300'>
            <IoFilter color="#9CA3AF" />
          </button>
        </div>
        {filter && <FilterDialog filter={filter} setFilter={setFilter} />}
        <div className="w-full">
          <OneLineDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} dateSet={dateSet} />
          <DateHeading date={selectedDate} />
          <div className='flex gap-6'>
            <div className='hidden md:block col'>
              <HalfScreenDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} dateSet={dateSet} />
            </div>
            <div className="col w-full">
              <Suspense fallback={Array(3).fill(<CourseItemSkeleton />)}>
                <CourseItems selectedDate={selectedDate} filter={filter} />
              </Suspense >
            </div>
          </div>
        </div>
      </div >
      <div className='mt-8 grid place-content-center ml-3 rounded-3xl overflow-hidden'>
        {/* <Zmage src="/course_schedule.jpg" alt="course schedule" backdrop='#FFF5ED' edge={25} controller={{ rotate: false }} /> */}
        <Image src={staticSchedulePath} width={800} height={800} alt="course schedule" />
      </div>
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
