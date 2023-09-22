import CoursesShower from '@/components/course/CoursesShower'
import TheTitle from '@/components/TheTitle'
import getDateOptions from '@/lib/course/getDateOptions'

export default async function Course() {
  const dateOptions = await getDateOptions()

  return (
    <>
      <div className='max-w-[780px] mx-auto'>
        <TheTitle>預約課程</TheTitle>
        <CoursesShower dateOptions={dateOptions} />
      </div>
    </>
  )
}