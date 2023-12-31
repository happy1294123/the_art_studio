import { Dispatch, useMemo } from 'react'
import ReserveDialogUpper from "../course/ReserveDialogUpper"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import ScheduleHref from '@/components/ScheduleHref'
import { KeyedMutator } from 'swr'
import dateFormatter from '@/lib/dateFormatter'
import toast from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import { MyCourse, MyReservation } from '@/type'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {
  open: boolean,
  setOpen: Dispatch<boolean>,
  course: MyCourse,
  current_rez: number,
  mutateReservation: KeyedMutator<Record<string, MyReservation[]>> | undefined,
  mutate?: KeyedMutator<MyCourse[]>,
  payState?: string
}

export default function UserCourseDialog({ open, setOpen, course, current_rez, mutateReservation, mutate, payState }: Props) {
  const currentCourseUrl = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_HOST}/course?id_date=${course.id}_${dateFormatter(new Date(course.date))}`
  }, [course])

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(currentCourseUrl)
    toast('已複製此課程網址', getToastOption('info'))
  }

  const { data: session } = useSession()
  const router = useRouter()
  const handleGoPayment = () => {
    const myPayment = course.Payment.find(p => p.user_id === session?.user.id)
    if (myPayment) {
      setOpen(false)
      router.push(`/user?tab=payment&id=${myPayment.id}`)
    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white p-8 drop-shadow-2xl">
        <div>
          <ReserveDialogUpper course={course} isUser={true} setOpen={setOpen} mutate={mutate} mutateReservation={mutateReservation} />
          {current_rez >= course.baseline_rez
            ? <div className="text-xl text-center">已開課</div>
            : (<>
              <div className='text-center'>多{course.baseline_rez - current_rez}位學員即可開課</div>
              <Button variant="secondary" className="w-full h-10 mt-3 text-xl" onClick={handleCopyUrl}>分享給好友</Button>
            </>)
          }
          <ScheduleHref course={course}>
            <Button variant={(payState && payState === 'PENDING') ? 'secondary' : 'default'} className="w-full h-10 mt-3 text-xl">加入行事曆</Button>
          </ScheduleHref>
          {payState === 'PENDING' && <Button className="w-full h-10 mt-3 text-xl" onClick={handleGoPayment}>前往匯款</Button>}
          {payState === 'CHECKING' && <span className='flex-center mt-2 text-gray-400'>匯款資料核對中</span>}
          <div className="flex text-gray-500 gap-2 mt-1 -mb-2 mr-3 justify-end text-sm">
            <a target='_blank' href={`/course/introduction#${course.name}`}>課程介紹</a>
            <a target='_blank' href="/course/note">上課須知</a>
          </div>
        </div >
      </DialogContent >
    </Dialog >
  )
}
