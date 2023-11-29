'use client'
import CourseSchedule from '../manage/Course/CourseSchedule'
import { SWRConfig } from 'swr'
import { fetcher } from '@/lib/fetcher'

export default function TeacherCourseContent() {
  return (
    <div>
      <SWRConfig value={{ fetcher }}>
        <CourseSchedule isTeacherMode={true} />
      </SWRConfig>
    </div>
  )
}
