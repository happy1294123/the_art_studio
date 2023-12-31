import { Dispatch, useMemo, useState } from 'react'
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
import { KeyedMutator } from 'swr'
import dateFormatter from '@/lib/dateFormatter'
import { useSession } from 'next-auth/react'
import { MyCourse, MyReservation } from '@/type'
import ClipLoader from 'react-spinners/ClipLoader'
import CourseTypeBadge from '../CourseTypeBadge'
import Link from 'next/link'

type Props = {
  course: MyCourse,
  setOpen?: Dispatch<boolean>,
  mutate?: KeyedMutator<MyCourse[]>,
  mutateReservation?: KeyedMutator<Record<string, MyReservation[]>>,
  isUser?: Boolean,
}

export default function ReserveDialogUpper({ course, setOpen, mutate, mutateReservation, isUser = false }: Props) {
  const dateString = useMemo(() => {
    const date = new Date(course.date)
    return `${date.getMonth() + 1}/${date.getDate()}(${getWeekDayByDate(date)})`
  }, [course.date])
  const { update: updateSession } = useSession()

  const [checking, setChecking] = useState(false)
  const handleCancelCourse = async () => {
    setChecking(true)
    const checkRes = await fetch(`/api/user/course/checkCancel?course_id=${course.id}`)
    if (!checkRes.ok) {
      console.log('檢查錯誤');
      setChecking(false)
      return
    }
    const checkResData = await checkRes.json()
    console.log(checkResData);

    if (checkResData.type === 'alert') {
      toast(checkResData.message, getToastOption('error'))
      setChecking(false)
      return
    }
    if (checkResData.hasDiscount) {
      alert('此折扣碼優惠將無法再使用')
    }
    const isConfirm = confirm(checkResData.message)
    if (!isConfirm) {
      setChecking(false)
      return
    }
    if (checkResData.stateTo === 'PENDING') return

    const res = await fetch('/api/user/course', {
      method: 'DELETE',
      body: JSON.stringify({ course_id: course.id, stateTo: checkResData.stateTo, returnPoint: checkResData.returnPoint })
    })
    if (res.ok) {
      setOpen && setOpen(false)
      toast('取消課程成功', getToastOption())
      mutate && mutate()
      mutateReservation && mutateReservation()
      const currentPoint = await res.json()
      updateSession({
        point: currentPoint
      })
      if (checkResData.returnPoint) {
        toast(`退還${checkResData.returnPoint}點點數`, getToastOption('info'))
      }
    }
    setChecking(false)
  }

  const currentCourseUrl = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_HOST}/course?id_date=${course.id}_${dateFormatter(new Date(course.date))}`
  }, [course])

  const handleCopyUrl = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(currentCourseUrl);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = currentCourseUrl;

      // Move the textarea outside the viewport to make it invisible
      textarea.style.position = 'absolute';
      textarea.style.left = '-99999999px';

      document.body.prepend(textarea);

      // highlight the content of the textarea element
      textarea.select();

      try {
        document.execCommand('copy');
      } catch (err) {
        console.log(err);
      } finally {
        textarea.remove();
      }
    }
    // await navigator.clipboard.writeText(currentCourseUrl)
    toast('已複製此課程網址', getToastOption())
  }

  const handleShareLine = () => {
    if (window) {
      const myWindow = window.open(`http://line.naver.jp/R/msg/text/?一起去【媞藝術空間】上課吧！ \n ${currentCourseUrl}`, '_blank')
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { // check is moblie
        setTimeout(() => {
          myWindow?.close()
        }, 2000)
      }
    }
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
                <span
                  className='flex gap-1 align-middle cursor-pointer'
                  onClick={handleShareLine}
                >
                  <FaLine size={21} />
                  <span className='my-auto'>分享至Line</span>
                </span>
                {/* <a href={`http://line.naver.jp/R/msg/text/?一起去【媞藝術空間】上課吧！ \n ${currentCourseUrl}`}
                  target='_blank'
                  className='flex gap-1 align-middle'>
                  <FaLine size={21} />
                  <span className='my-auto'>分享至Line</span>
                </a> */}
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
                {checking
                  ? <div className="flex-center px-7">
                    <ClipLoader size={20} color="#D1C0AD" />
                  </div>
                  : <div className="cursor-pointer flex gap-1" onClick={handleCancelCourse}>
                    <TbCalendarCancel className="my-auto" />取消預約
                  </div >}
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>}
      </div >
      <DialogHeader>
        <DialogTitle className='text-left'>
          <span className="font-bold text-3xl tracking-wider">{course.name}</span>
          {course.type && <CourseTypeBadge name={course.type} className='ml-3 text-xs' />}
        </DialogTitle>
        <DialogDescription className="text-gray-500">
          <div className="flex gap-2.5">
            <BiTime className="ml-2 my-auto" />
            <span className="my-auto ml-1">{dateString} {course.start_time} ~ {course.end_time}</span>
          </div>
          <div className="flex gap-1 mt-2">
            <div className="w-7 h-7 my-auto rounded-full overflow-hidden">
              <Image src={course.teacher.image || '/avatar/default_avatar.jpeg'} className="aspect-square h-full w-full" width={20} height={20} alt="teacher" />
            </div>
            <span className="my-auto ml-1">{course.teacher.name}</span>
          </div>
        </DialogDescription>
      </DialogHeader>
    </>
  )
}
