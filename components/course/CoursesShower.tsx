'use client'
import OneLineDatePicker from '@/components/course/datePicker/OneLineDatePicker'
import HalfScreenDatePicker from '@/components/course/datePicker/HalfScreenDatePicker'
import CourseItem from '@/components/course/CourseItem'
import { useState, useMemo, useEffect } from 'react'
import { PrismaClient } from '@prisma/client'
import dateFormatter from '@/lib/dateFormatter'

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
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [courses, setCourses] = useState<Course[]>([])
  // const selectedCourse = useMemo(() => courses.filter(c => c.date === `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${selectedDate.getDate()}`), [selectedDate, courses])

  useEffect(() => {
    const fetchCourses = async (date: Date) => {
      const dateString = dateFormatter(date)
      const res = await fetch(`/api/course?date=${dateString}`)
      const courses = await res.json()
      setCourses(courses)
    }
    fetchCourses(selectedDate)
    document.querySelector('.my-popover-content')?.remove()
  }, [selectedDate])
  return (
    <>
      <div className="md:grid grid-cols-2 gap-8">
        <div className="hidden md:block mx-auto">
          {/* <HalfScreenDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} dateSet={dateOptions} /> */}
        </div>
        <div className="w-full">
          <OneLineDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} dateSet={dateOptions} weekDayMap={weekDayMap} />
          <div className="text-center text-lg p-1 bg-bgColorSecondary rounded-full mb-1 md:">
            {selectedDate.getFullYear()}/
            {selectedDate.getMonth() + 1}/
            {selectedDate.getDate()}
            ({weekDayMap[selectedDate.getDay() as keyof typeof weekDayMap]})
          </div>
          {courses.length > 0
            ? (<div className="mt-2">
              {courses.map(course => (<CourseItem key={course.id} course={course} />))}
            </div>)
            : <div className="text-center">當天沒有課程</div>
          }
        </div>
      </div>
    </>
  )
}
