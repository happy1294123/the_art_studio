'use client'
import { useState, useEffect, useMemo } from 'react'
import OneLineDatePicker from '@/components/course/datePicker/OneLineDatePicker'
import HalfScreenDatePicker from '@/components/course/datePicker/HalfScreenDatePicker'
import CourseItem from '@/components/course/CourseItem'
import dateFormatter from '@/lib/dateFormatter'
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  dateOptions: string[]
}

const weekDayMap = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
}

export default function CoursesShower({ dateOptions }: Props) {
  const today = dateFormatter()
  const dateSet = useMemo(() => (dateOptions.filter(d => d >= today)), [today, dateOptions])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCourses = async (date: Date) => {
      // const courses = await getCourseByDate(date)
      // console.log(courses)
      const dateString = dateFormatter(date)
      const res = await fetch(`/api/course?date=${dateString}`)
      const courses = await res.json()
      // console.log(courses)
      setCourses(courses)
      setLoading(false)
    }
    if (dateOptions.includes(dateFormatter(selectedDate))) {
      setLoading(true)
      fetchCourses(selectedDate)
      document.querySelector('.my-popover-content')?.remove()
    } else {
      setLoading(false)
      setCourses([])
    }
  }, [dateOptions, selectedDate])

  return (
    <>
      <div className="md:grid grid-cols-2 gap-8">
        <div className="hidden h-full md:block mx-auto">
          <HalfScreenDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} dateSet={dateSet} />
        </div>
        <div className="w-full">
          <OneLineDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} dateSet={dateSet} weekDayMap={weekDayMap} />
          <div className="text-center text-lg p-1 bg-bgColorSecondary rounded-full mb-1 md:">
            {selectedDate.getFullYear()}/
            {selectedDate.getMonth() + 1}/
            {selectedDate.getDate()}
            ({weekDayMap[selectedDate.getDay() as keyof typeof weekDayMap]})
          </div>
          {loading
            ? [1, 2, 3].map(i => <CourseItemSkeleton key={i} />)
            : (courses.length > 0
              ? (<div className="mt-2">
                {courses.map(course => (<CourseItem key={course.id} course={course} weekDayMap={weekDayMap} />))}
              </div>
              )
              : <div className="text-center">當天沒有課程</div>)}
        </div>
      </div >
    </>
  )
}

const CourseItemSkeleton = () => {
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
