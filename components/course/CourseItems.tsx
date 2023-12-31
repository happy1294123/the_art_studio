import CourseItem from './CourseItem'
import useSWR from 'swr'
import dateFormatter from '@/lib/dateFormatter'
import ClipLoader from 'react-spinners/ClipLoader'
import { MyCourse } from '@/type'
import { useReserveContent } from '@/context/ReserveContent'
import { fetcher } from '@/lib/fetcher'

// async function fetcher(url: string): Promise<MyCourse[]> {
//   const res = await fetch(url, { next: { tags: ['course'] } })
//   return await res.json()
// }

export default function CourseItems() {
  const { selectedDate, filter } = useReserveContent()

  const { data: courses, mutate, isLoading } = useSWR<MyCourse[]>(
    `/api/course?date=${dateFormatter(selectedDate)}`,
    fetcher
  )

  if (isLoading) return (<div className="flex-center pt-2" >
    <ClipLoader size={20} color="#D1C0AD" />
  </div>)

  const filtedCourses = (() => {
    if (!filter?.column || !filter?.value) return courses
    if (filter.column === 'courseType') {
      return courses?.filter(course => course.type === filter.value)
    }
    if (filter.column === 'teacherName') {
      return courses?.filter(course => course.teacher_id === parseInt(filter.value))
    }
    return courses
  })()

  return (
    <div className="mt-2">
      {filtedCourses && filtedCourses.length > 0
        ? filtedCourses.map(course => (<>
          <CourseItem key={course.id} course={course} mutate={mutate} />
        </>))
        : <div className="text-center">沒有課程</div>}
    </div >
  )
}
