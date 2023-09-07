import CoursesShower from '@/components/course/CoursesShower'
import TheTitle from '@/components/TheTitle'

const fetchDateOptions = async () => {
  const res = await fetch(process.env.HOST + '/api/course/all')
  return res.json()
}

export default async function Course() {
  const dateOptions = await fetchDateOptions()

  return (
    <>
      <TheTitle>預約課程</TheTitle>
      <CoursesShower dateOptions={dateOptions} />
    </>
  )
}