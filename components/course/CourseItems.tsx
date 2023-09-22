import CourseItem from '@/components/course/CourseItem'
import useSWR from 'swr'
import dateFormatter from '@/lib/dateFormatter'
import ClipLoader from 'react-spinners/ClipLoader'

async function fetcher(url: string): Promise<Course[]> {
  const res = await fetch(url, { next: { tags: ['course'] } })
  return await res.json()
}

export default function CourseItems({ selectedDate }: { selectedDate: Date }) {
  const { data: courses, mutate, isLoading } = useSWR(
    `/api/course?date=${dateFormatter(selectedDate)}`,
    fetcher
  )

  return (
    <div className="mt-2">
      {isLoading
        ? (<div className="flex-center pt-2" >
          <ClipLoader size={20} color="#D1C0AD" />
        </div>)
        : courses && courses.length > 0
          ? courses.map(course => (<>
            <CourseItem key={course.id} course={course} mutate={mutate} />
          </>))
          : <div className="text-center">當天沒有課程</div>}
    </div >
  )
}
