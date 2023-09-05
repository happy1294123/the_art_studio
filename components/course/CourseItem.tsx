import { useState } from 'react'
import { BiTime } from 'react-icons/bi'
import { GoPerson } from 'react-icons/go'
import Image from 'next/image'
import ReserveDialog from './ReserveDialog'

type Props = {
  course: Course
}

export default function CourseItem({ course }: Props) {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className={`p-4 rounded-3xl mb-3 drop-shadow-lg border border-gray-300 shadow-md ${course.current_rez === course.total_rez ? 'opacity-40' : 'cursor-pointer'}`} onClick={() => setOpenDialog(!openDialog)}>
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
          <Image src={course.teacher.image} width={20} height={20} alt="teacher image" />
          <span className="my-auto">{course.teacher.name}</span>
        </div>
        <div className="flex gap-2">
          <div className="flex mt-auto">
            <GoPerson className="text-xs mr-[2px] mt-[1px]" />
            <span className="text-xs">{course.current_rez}/{course.total_rez}</span>
          </div>
          {course.current_rez === course.total_rez
            ? <span className="px-4 text-sm mt-auto text-gray-800">額滿</span>
            : <ReserveDialog course={course} open={openDialog} setOpen={setOpenDialog} />
          }
        </div>
      </div>
    </div >
  )
}
