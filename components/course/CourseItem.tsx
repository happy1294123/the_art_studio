import { useState, useMemo, lazy } from 'react'
import { BiTime } from 'react-icons/bi'
import { GoPerson } from 'react-icons/go'
import { Button } from '@/components/ui/button'
import Image from "next/image"

type Props = {
  course: Course,
  weekDayMap: Record<number, string>
}

const ReserveDialog = lazy(() => import("./ReserveDialog"));

export default function CourseItem({ course, weekDayMap }: Props) {
  const [open, setOpen] = useState(false)
  const current_rez = useMemo(() => course.Reservation.length, [course])

  return (
    <>
      <div className={`p-4 rounded-3xl mb-3 drop-shadow-lg border border-gray-300 shadow-md ${current_rez === course.total_rez ? 'opacity-40' : 'cursor-pointer'}`}
        onClick={() => setOpen(true)}>
        <div className="flex">
          <span className="font-bold text-lg tracking-wider">{course.name}</span>
          <span className="my-auto ml-3 px-2 text-xs bg-secondary text-secondary-foreground rounded-full">{course.type}</span>
        </div>
        <div className="flex gap-2">
          <BiTime className="my-auto" />
          <span>{course.start_time} ~ {course.end_time}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="w-6 h-6 my-auto rounded-full overflow-hidden">
              <Image src={course.teacher.image} className="aspect-square h-full w-full" width={10} height={10} alt="teacher" />
            </div>
            <span className="my-auto">{course.teacher.name}</span>
          </div>
          <div className="flex gap-2">
            <div className="flex mt-auto">
              <GoPerson className="text-xs mr-[2px] mt-[1px]" />
              <span className="text-xs">{current_rez}/{course.total_rez}</span>
            </div>
            {current_rez === course.total_rez
              ? <span className="px-4 text-sm mt-auto text-gray-800">額滿</span>
              // TODO 根據自身是否預約改變UI
              : <Button>預約</Button>}
          </div>
        </div>
      </div >

      {current_rez !== course.total_rez &&
        <ReserveDialog open={open} setOpen={setOpen} course={course} weekDayMap={weekDayMap} />
      }
    </>
  )
}
