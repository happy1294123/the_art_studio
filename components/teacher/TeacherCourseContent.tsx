'use client'
import { CourseContent } from '@/lib/contexts/ManageCourseContent'
import useSWR from 'swr'
import { MyCourse } from '@/type'
import CourseSchedule from '../manage/Course/CourseSchedule'
import { ClipLoader } from 'react-spinners'
import { CourseType } from '@prisma/client'

async function courseFetcher(url: string): Promise<MyCourse[]> {
  const res = await fetch(url, { next: { tags: ['course'] } })
  return await res.json()
}

async function courseTypeFetcher(url: string): Promise<CourseType[]> {
  const res = await fetch(url, { next: { tags: ['courseType'] } })
  return await res.json()
}

export default function TeacherCourseContent() {
  const { data: courses } = useSWR(
    `/api/teacher/course`,
    courseFetcher
  )

  const { data: courseType } = useSWR(
    '/api/manage/course/type',
    courseTypeFetcher
  )

  return (
    <div>
      {courses
        ? <CourseContent.Provider value={{ courses, courseType }}>
          <CourseSchedule isTeacherMode={true} />
        </CourseContent.Provider>
        : <div className="flex-center">
          <ClipLoader color="#D1C0AD" />
        </div>}
    </div>
  )
}
