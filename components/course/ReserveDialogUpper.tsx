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
import { TbYoga } from 'react-icons/tb'
import { BiNote } from 'react-icons/bi'
import { MdOutlineCancel } from 'react-icons/md'
import { TbCalendarCancel } from 'react-icons/tb'
import { FaLine } from 'react-icons/fa'
import { getWeekDayByDate } from '@/components/course/DateHeading'
import { toast } from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import { KeyedMutator } from 'swr'

type Props = {
  course: Course,
  setOpen?: Dispatch<boolean>,
  mutateReservation?: KeyedMutator<Record<string, Reservation[]>>,
  isUser?: Boolean,
}

export default function ReserveDialogUpper({ course, setOpen, mutateReservation, isUser = false }: Props) {
  const dateString = useMemo(() => {
    const date = new Date(course.date)
    return `${date.getMonth() + 1}/${date.getDate()}(${getWeekDayByDate(date)})`
  }, [course.date])

  const handleCancelCourse = async () => {
    // TODO 根據取消規則做判斷
    // TODO 再次確認是否要刪除
    const res = await fetch('/api/user/course', {
      method: 'DELETE',
      body: JSON.stringify({ course_id: course.id })
    })
    if (res.ok) {
      toast('取消課程成功', getToastOption('light'))
      setOpen && setOpen(false)
      mutateReservation && mutateReservation()
    }
    const data = await res.json()
    console.log(data)
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
                <a href="https://social-plugins.line.me/lineit/share?url=https://the-art-studio.vercel.app"
                  className='flex gap-1'>
                  <FaLine size={21} />分享Line
                </a>
              </div>
              {/* <div className="cursor-pointer pl-2">
                <a href="/course/note" target='_blank' className='flex gap-1'>
                  <TbYoga className="my-auto" />Line
                </a>
              </div > */}
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger onFocus={e => e.target.blur()}>
            <CiCircleMore />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-bgColorOther text-headingColor drop-shadow-md border-headingColor data-[state=open]:animate-[dialog-content-show_300ms]
                    data-[state=closed]:animate-[dialog-content-hide_300ms] min-w-[5rem]">
            <DropdownMenuLabel >
              <div className="cursor-pointer">
                <a href="/course/note" target='_blank' className='flex gap-1'>
                  <TbYoga className="my-auto" />課程內容
                </a>
              </div >
            </DropdownMenuLabel>
            <DropdownMenuLabel >
              <div className="cursor-pointer">
                <a href="/course/note" target='_blank' className='flex gap-1'>
                  <BiNote className="my-auto" />上課須知
                </a>
              </div >
            </DropdownMenuLabel>
            <DropdownMenuLabel >
              <div className="cursor-pointer">
                <a href="/course/cancel-spec" target='_blank' className='flex gap-1'>
                  <MdOutlineCancel className="my-auto" />取消規範
                </a>
              </div >
            </DropdownMenuLabel>
            {isUser && <DropdownMenuLabel >
              <div className="cursor-pointer flex gap-1" onClick={handleCancelCourse}>
                <TbCalendarCancel className="my-auto" />取消預約
              </div >
            </DropdownMenuLabel>}
          </DropdownMenuContent>
        </DropdownMenu>
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
          <div className="flex gap-1 my-2">
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
