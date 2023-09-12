import { useMemo } from 'react'
import { BiTime } from 'react-icons/bi'
import Image from "next/image"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getWeekDayByDate } from '@/components/course/DateHeading'

type Props = {
  course: Course
}

export default function ReserveDialogUpper({ course }: Props) {
  const dateString = useMemo(() => {
    const date = new Date(course.date)
    return `${date.getMonth() + 1}/${date.getDate()}(${getWeekDayByDate(date)})`
  }, [course.date])

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-left'>
          <span className="font-bold text-3xl">{course.name}</span>
          <span className="ml-3 px-2 text-xs bg-secondary text-secondary-foreground rounded-full">{course.type}</span>
        </DialogTitle>
        <DialogDescription className="text-gray-500">
          <div className="flex gap-2">
            <BiTime className="my-auto text-xl" />
            <span>{dateString} {course.start_time} ~ {course.end_time}</span>
          </div>
          <div className="flex gap-2 my-2">
            <div className="w-6 h-6 my-auto rounded-full overflow-hidden">
              <Image src={course.teacher.image} className="aspect-square h-full w-full" width={10} height={10} alt="teacher" />
            </div>
            <span className="my-auto">{course.teacher.name}</span>
          </div>
        </DialogDescription>
      </DialogHeader>

      <div className="flex text-left mt-4 leading-6">
        課程內容介紹課程內容介紹課程內容介紹課程內容介紹課程內容介紹
        課程內容介紹課程內容介紹課程內容介紹課程內容介紹課程內容介紹
        課程內容介紹課程內容介紹課程內容介紹課程內容介紹課程內容介紹
        課程內容介紹課程內容介紹課程內容介紹課程內容介紹課程內容介紹
      </div>
      <div className="flex-center mx-5 p-5 bg-secondary text-secondary-foreground rounded-3xl my-3">
        預約須知內容預約須知內容預約須知內容預約須知內容預約須知內容預約須知內容預約須知內容
      </div>
    </>
  )
}
