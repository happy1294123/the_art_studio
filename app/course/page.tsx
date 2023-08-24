import OneLineDatePicker from '@/components/course/datePicker/OneLineDatePicker'
import CourseList from '@/components/course/CourseList'
import TheTitle from '@/components/TheTitle'

export default async function Course({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {

  const makeTodayDate = () => {
    const today = new Date()
    return `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
  }
  const date = searchParams?.date || makeTodayDate()
  return (
    <>
      <TheTitle>預約課程</TheTitle>
      <div className="md:flex justify-around gap-4">
        <div id="HalfScreenDatePicker" className="mr-4 mt-6 hidden md:block"></div>
        <div className="my-4 md:w-[600px]">
          <OneLineDatePicker date={date} />
          <CourseList date={date} />
        </div>
      </div>
    </>
  )

}