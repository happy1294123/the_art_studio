import OneLineDatePicker from '@/components/course/datePicker/OneLineDatePicker'
import CourseList from '@/components/course/CourseList'

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
      <div className="text-3xl text-headingColor font-bold my-6">預約課程</div>
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