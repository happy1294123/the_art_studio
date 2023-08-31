import { BiTime } from 'react-icons/bi'
import { GoPerson } from 'react-icons/go'
import Image from 'next/image'
import { Button } from '../ui/button'
import ReserveDialog from './ReserveDialog'

type Props = {
  course: Course
}

export default function CourseItem({ course }: Props) {
  return (
    <div className="p-4 rounded-3xl mb-3 drop-shadow-lg border border-gray-300">
      <div className="flex">
        <span className="font-bold text-lg">{course.name}</span>
        <span className="my-auto ml-3 px-2 text-xs bg-secondary text-secondary-foreground rounded-full">{course.type.name}</span>
      </div>
      <div className="flex gap-2">
        <BiTime className="my-auto" />
        <span>{course.time}</span>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Image src={course.teacher_image} width={20} height={20} alt="teacher image" />
          <span className="my-auto">{course.teacher}</span>
        </div>
        <div className="flex gap-2">
          <div className="flex mt-auto">
            <GoPerson className="text-xs mr-[2px] mt-[1px]" />
            <span className="text-xs">{course.reservations}/{course.total_reservations}</span>
          </div>
          {course.reservations === course.total_reservations
            ? <Button variant="secondary" disabled>額滿</Button>
            : <ReserveDialog course={course} />
          }
        </div>
      </div>
    </div >
  )
}
