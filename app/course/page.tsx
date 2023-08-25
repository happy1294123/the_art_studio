import CoursesShower from '@/components/course/CoursesShower'
import TheTitle from '@/components/TheTitle'

async function getCourses(): Promise<Course[]> {
  const res = await fetch(`${process.env.HOST}/api/course`)
  return res.json()
}

export default async function Course() {
  const courses = await getCourses()

  return (
    <>
      <TheTitle>預約課程</TheTitle>
      <CoursesShower courses={courses} />
    </>
  )
}