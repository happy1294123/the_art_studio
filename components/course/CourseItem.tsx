import { useState } from 'react'
import { BiTime } from 'react-icons/bi'
import { GoPerson } from 'react-icons/go'
import { Button } from '@/components/ui/button'
import Image from "next/image"
import { useSession } from 'next-auth/react'
import { KeyedMutator } from 'swr'
import { useSearchParams } from 'next/navigation'
import { MyCourse, MyReservation } from '@/type'
import CourseTypeBadge from '../CourseTypeBadge'
import UserCourseDialog from '../user/UserCourseDialog'
import ReserveDialog from './ReserveDialog'
// import dynamic from 'next/dynamic'
// const ReserveDialog = dynamic(() => import("./ReserveDialog"))
// const UserCourseDialog = dynamic(() => import("../user/UserCourseDialog"))

type Props = {
  course: MyCourse,
  mutate?: KeyedMutator<MyCourse[]>,
  mutateReservation?: KeyedMutator<Record<string, MyReservation[]>>,
  isInUserPage?: boolean
}

export default function CourseItem({ course, mutate, mutateReservation, isInUserPage = false }: Props) {
  const id_date = useSearchParams().get('id_date')
  const [open, setOpen] = useState(id_date?.split('_')[0] === String(course.id) ? true : false)
  const current_rez = course.Reservation.filter(r => r.state === 'SUCCESS').length
  const { data: session } = useSession()
  const hasReserve = Boolean(course.Reservation.find(r => r.user_id === session?.user.id))
  const hasCancel = Boolean(course.Reservation.find(r => r.user_id === session?.user.id && r.state === 'CANCEL'))
  const payState = course.Payment.find(p => p.user_id === session?.user.id)?.state

  const getUserPageBtn = () => {
    if (payState === 'PENDING') {
      return <Button>待匯款</Button>
    } else if (payState === 'CHECKING') {
      return <Button variant="secondary">核對中</Button>
    }

    if (current_rez >= course.baseline_rez) {
      return <Button>已開課</Button>
    } else {
      return <Button variant="secondary">待開課</Button>
    }
  }

  const getCoursePageSpan = () => {

    if (current_rez === course.total_rez) {
      return <span className="px-4 text-sm mt-auto text-gray-800">額滿</span>
    }
    if (hasReserve) {
      let spanText = hasCancel ? '已取消' : '已預約'
      const pending = course.Reservation.find(r => r.state === 'PENDING' && r.user_id === session?.user.id)
      if (pending) {
        spanText = '已保留'
      }
      return <span className="px-2.5 text-sm mt-auto">
        {spanText}
      </span>
    }
    return <Button>預約</Button>
  }

  return (
    <>
      <div className={`p-4 rounded-3xl mb-3 drop-shadow-lg border border-gray-300 shadow-md cursor-pointer
      ${(current_rez === course.total_rez || hasReserve) && !isInUserPage && ''}`}
        // opacity-40
        onClick={() => setOpen(true)}>
        <div className="flex">
          <span className="font-bold text-lg tracking-wider">{course.name}</span>
          {course.type && <CourseTypeBadge name={course.type} className='text-xs my-auto ml-3' />}
          {/* <span className="my-auto ml-3 px-2 text-xs rounded-full" style={{ backgroundColor: getColorByCourseType(course.type) }}>{course.type}</span> */}
        </div>
        <div className="flex gap-2.5 ml-1">
          <BiTime className="my-auto" />
          <span>{course.start_time} ~ {course.end_time}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="w-6 h-6 my-auto rounded-full overflow-hidden">
              <Image src={course.teacher.image || '/avatar/default_avatar.jpeg'} className="aspect-square h-full w-full" width={10} height={10} alt="teacher" />
            </div>
            <span className="my-auto">{course.teacher.name}</span>
          </div>
          <div className="flex gap-2">
            <div className="flex mt-auto">
              <GoPerson className="text-xs mr-[2px] mt-[1px]" />
              <span className="text-xs">{current_rez}/{course.total_rez}</span>
            </div>
            {isInUserPage ? getUserPageBtn() : getCoursePageSpan()}
          </div>
        </div>
      </div >

      {hasReserve ?
        <UserCourseDialog open={open} setOpen={setOpen} course={course} current_rez={current_rez} mutateReservation={mutateReservation} mutate={mutate} payState={payState} />
        :
        <ReserveDialog open={open} setOpen={setOpen} course={course} mutate={mutate} />}
    </>
  )
}