'use client'
import DatePicker from '@/components/course/datePicker/DatePicker'
import CourseItem from '@/components/course/CourseItem'
import { useState, useMemo } from 'react'

type Props = {
  courses: Course[]
}

export default function CoursesShower({ courses }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const selectedCourse = useMemo(() => courses.filter(c => c.date === `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${selectedDate.getDate()}`), [selectedDate, courses])
  return (
    <>
      <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} courses={courses} />
      {selectedCourse.length > 0
        ? (<div>
          {selectedCourse.map((course: Course) => (<CourseItem key={course.id} course={course} />))}
        </div>)
        : <div className="text-center">當天沒有課程</div>
      }
    </>
  )
}
