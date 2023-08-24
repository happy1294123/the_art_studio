import CoursesShower from '@/components/course/CoursesShower'
import TheTitle from '@/components/TheTitle'

async function getCourses(): Promise<Course[]> {
  const res = await fetch(`http://127.0.0.1:3000/api/course`)
  return res.json()
}

export default async function Course() {
  const courses = await getCourses()

  return (
    <>
      <TheTitle>預約課程</TheTitle>
      <div className="md:flex justify-center gap-4">
        <div id="HalfScreenDatePicker" className="mr-4 mt-6 relative hidden md:block"></div>
        <div className="my-4 md:w-[600px]">
          <CoursesShower courses={courses} />
        </div>
      </div>
    </>
  )
}