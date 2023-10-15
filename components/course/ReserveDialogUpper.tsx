import { Dispatch, useMemo } from 'react'
import { BiTime } from 'react-icons/bi'
import Image from "next/image"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CiCircleMore } from 'react-icons/ci'
import { PiShareFatLight } from 'react-icons/pi'
import { TbCalendarCancel } from 'react-icons/tb'
import { FaLine, FaFacebookSquare, FaLink } from 'react-icons/fa'
import { getWeekDayByDate } from '@/components/course/DateHeading'
import { toast } from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import { BiSolidError } from 'react-icons/bi'
import { KeyedMutator } from 'swr'
import dateFormatter from '@/lib/dateFormatter'
import { useSession } from 'next-auth/react'

type Props = {
  course: Course,
  setOpen?: Dispatch<boolean>,
  mutate?: KeyedMutator<Course[]>,
  mutateReservation?: KeyedMutator<Record<string, Reservation[]>>,
  isUser?: Boolean,
}

export default function ReserveDialogUpper({ course, setOpen, mutate, mutateReservation, isUser = false }: Props) {
  const dateString = useMemo(() => {
    const date = new Date(course.date)
    return `${date.getMonth() + 1}/${date.getDate()}(${getWeekDayByDate(date)})`
  }, [course.date])
  const { update: updateSession } = useSession()

  const handleCancelCourse = async () => {
    const checkRes = await fetch(`/api/user/course/checkCancel?course_id=${course.id}`)
    if (!checkRes.ok) {
      console.log('檢查錯誤');
      return
    }
    const checkResData = await checkRes.json()
    if (checkResData.type === 'alert') {
      toast(checkResData.message, getToastOption('light', <BiSolidError className="my-auto text-xl" />))
      return
    }
    const isConfirm = confirm(checkResData.message)
    if (!isConfirm) return
    // TODO 討論更改課程流程
    // TODO 取消免費體驗的流程(折扣碼)
    if (checkResData.stateTo === 'PENDING') return

    const res = await fetch('/api/user/course', {
      method: 'DELETE',
      body: JSON.stringify({ course_id: course.id, stateTo: checkResData.stateTo, returnPoint: checkResData.returnPoint })
    })
    if (res.ok) {
      toast('取消課程成功', getToastOption('light'))
      setOpen && setOpen(false)
      mutate && mutate()
      mutateReservation && mutateReservation()
      const currentPoint = await res.json()
      updateSession({
        point: currentPoint
      })
      if (checkResData.returnPoint) {
        toast(`退還${checkResData.returnPoint}點點數`, getToastOption())
      }
    }
    // const data = await res.json()
    // console.log(data)
  }

  const currentCourseUrl = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_HOST}/course?id_date=${course.id}_${dateFormatter(new Date(course.date))}`
  }, [course])

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(currentCourseUrl)
    toast('已複製此課程網址', getToastOption('light'))
  }

  return (
    <>
      <div className="absolute top-3 right-9 flex">
        <DropdownMenu>
          <DropdownMenuTrigger onFocus={e => e.target.blur()}>
            <div className="p-1 cursor-pointer">
              <PiShareFatLight />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-bgColorOther text-headingColor drop-shadow-md border-headingColor data-[state=open]:animate-[dialog-content-show_300ms]
                    data-[state=closed]:animate-[dialog-content-hide_300ms] min-w-[10px]">
            <DropdownMenuLabel >
              <div>
                <a href={`https://social-plugins.line.me/lineit/share?url=${currentCourseUrl}`}
                  target='_blank'
                  className='flex gap-1 align-middle'>
                  <FaLine size={21} />
                  <span className='my-auto'>分享至Line</span>

                </a>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuLabel >
              <div>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentCourseUrl}`}
                  target='_blank'
                  className='flex gap-1'>
                  <FaFacebookSquare size={21} />
                  <span className='my-auto'>分享至facebook</span>
                </a>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuLabel >
              <div className='flex gap-1 ml-1 cursor-pointer'
                onClick={handleCopyUrl}>
                <FaLink size={17} />
                <span className='my-auto ml-0.5'>複製連結</span>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>

        {isUser &&
          <DropdownMenu>
            <DropdownMenuTrigger onFocus={e => e.target.blur()}>
              <CiCircleMore />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-bgColorOther text-headingColor drop-shadow-md border-headingColor data-[state=open]:animate-[dialog-content-show_300ms]
                    data-[state=closed]:animate-[dialog-content-hide_300ms] min-w-[5rem]">
              <DropdownMenuLabel >
                <div className="cursor-pointer flex gap-1" onClick={handleCancelCourse}>
                  <TbCalendarCancel className="my-auto" />取消預約
                </div >
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>}
      </div >
      <DialogHeader>
        <DialogTitle className='text-left'>
          <span className="font-bold text-3xl tracking-wider">{course.name}</span>
          <span className="ml-3 px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full">{course.type}</span>
        </DialogTitle>
        <DialogDescription className="text-gray-500">
          <div className="flex gap-2.5">
            <BiTime className="ml-2 my-auto" />
            <span className="my-auto ml-1">{dateString} {course.start_time} ~ {course.end_time}</span>
          </div>
          <div className="flex gap-1 mt-2">
            <div className="w-7 h-7 my-auto rounded-full overflow-hidden">
              <Image src={course.teacher.image} className="aspect-square h-full w-full" width={20} height={20} alt="teacher" />
            </div>
            <span className="my-auto ml-1">{course.teacher.name}</span>
          </div>
        </DialogDescription>
      </DialogHeader>
    </>
  )
}
