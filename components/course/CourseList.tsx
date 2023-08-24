import CourseItem from '@/components/course/CourseItem'

const getCourses = async function (date: string) {
  const res = await fetch(`http://localhost:3000/api/course?date=${date}`)
  return res.json()
}

type Props = {
  date: string
}

export default async function CourseList({ date }: Props) {
  const courses = await getCourses(date)
  return (
    <div>
      {courses.length > 0
        ? courses.map((course: Course) => (<CourseItem key={course.id} course={course} />))
        : <div className="text-center">當天沒有課程</div>
      }
    </div>
  )
}