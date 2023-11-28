'use client'
import { CourseContent } from '@/context/ManageCourseContent'
import useSWR from 'swr'
import { MyCourse } from '@/type'
import CourseSchedule from '../manage/Course/CourseSchedule'
import { ClipLoader } from 'react-spinners'
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
