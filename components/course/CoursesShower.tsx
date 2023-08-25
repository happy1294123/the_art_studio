'use client'
import OneLineDatePicker from '@/components/course/datePicker/OneLineDatePicker'
import HalfScreenDatePicker from '@/components/course/datePicker/HalfScreenDatePicker'
import CourseItem from '@/components/course/CourseItem'
import { useState, useMemo } from 'react'

type Props = {
  courses: Course[]
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

export default function CoursesShower({ courses }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const selectedCourse = useMemo(() => courses.filter(c => c.date === `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${selectedDate.getDate()}`), [selectedDate, courses])
  const dateSet = useMemo(() => [...new Set(courses.map(c => c.date))], [courses])
  return (
    <>
      <div className="md:grid grid-cols-2 gap-8">
        <div className="hidden md:block mx-auto">
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
          {selectedCourse.length > 0
            ? (<div>
              {selectedCourse.map((course: Course) => (<CourseItem key={course.id} course={course} />))}
            </div>)
            : <div className="text-center">當天沒有課程</div>
          }
        </div>
      </div>
    </>
  )
}
