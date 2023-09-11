import CourseItem from '@/components/course/CourseItem'
import useSWR from 'swr'
import dateFormatter from '@/lib/dateFormatter'

async function fetcher(url: string): Promise<Course[]> {
  const res = await fetch(url, { next: { tags: ['course'] } })
  return await res.json()
}

export default function CourseItems({ selectedDate, weekDay }: { selectedDate: Date, weekDay: string }) {
  const { data: courses, mutate } = useSWR(
    `/api/course?date=${dateFormatter(selectedDate)}`,
    fetcher
  )

  return (
    <div className="mt-2">
      {courses && courses.length > 0
        ? courses.map(course => (<CourseItem key={course.id} course={course} weekDay={weekDay} mutate={mutate} />))
        : <div className="text-center">當天沒有課程</div>
      }
    </div>
  )
}
