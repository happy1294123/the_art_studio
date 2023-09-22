import { useState, useEffect, Dispatch, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import RingLoader from 'react-spinners/RingLoader'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { KeyedMutator } from 'swr'
import ReserveDialogUpper from '@/components/course/ReserveDialogUpper'
import getToastOption from '@/lib/getToastOption'
import ScheduleHref from '@/components/ScheduleHref'
import { Input } from '@/components/ui/input'

type Props = {
  open: boolean,
  setOpen: Dispatch<boolean>,
  course: Course,
  mutate?: KeyedMutator<Course[]>
}

export default function ReserveDialog({ open, setOpen, course, mutate }: Props) {
  const [isReservePage, setIsReservePage] = useState(true)
  const [showDiscoutCode, setShowDiscoutCode] = useState(false)
  const [needWatchOpen, setNeedWatchOpen] = useState(false)
  const planOpt = useMemo(() => {
    return [
      {
        label: `點數 ${course.point} 點`,
        value: `${course.point}`
      },
      {
        label: `單次 ${course.price}元`,
        value: `${course.price}`
      }
    ]
  }, [course])
  const [plan, setPlan] = useState(planOpt[0])

  const router = useRouter()
  const { data: session }: any = useSession()
  const [isPending, setIsPending] = useState(false)
  const handleSubmitForm = async () => {
    console.log(plan)
    setIsPending(true)
    if (!session) {
      toast('請先登入會員', getToastOption('dark'))
      router.push('/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fcourse')
      setIsPending(false)
      return
    }

    const res = await fetch('/api/reservation', {
      method: 'POST',
      body: JSON.stringify({
        course_id: course.id,
        plan_name: plan.label,
        plan_value: plan.value
      })
    })
    if (res.ok) {
      setIsReservePage(false)
      setNeedWatchOpen(true)
      setIsPending(false)
    } else {
      const message = await res.json()
      toast(message, getToastOption('light'))
      setIsPending(false)
    }
  }

  useEffect(() => {
    if (needWatchOpen && open === false && mutate) {
      mutate()
    }
  }, [needWatchOpen, open, mutate])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white p-8 drop-shadow-2xl 
                    data-[state=open]:animate-[dialog-content-show_300ms]
                    data-[state=closed]:animate-[dialog-content-hide_300ms]">
        <div className={`${isReservePage ? 'block' : 'hidden'}`}>
          <ReserveDialogUpper course={course} />
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <span className='flex-center mx-auto -mb-5 text-sm w-fit'>選擇方案</span>
              <div className='text-gray-500 float-right mr-5 text-sm  mb-1 cursor-pointer'
                onClick={() => setShowDiscoutCode(!showDiscoutCode)}>折扣碼?</div>
              <div className="w-11/12 mx-auto grid md:grid-cols-2 gap-2">
                {planOpt.map(opt => (
                  <Badge
                    key={opt.label}
                    variant={`${opt.label === plan.label ? 'secondary' : 'outline'}`}
                    className="cursor-pointer"
                    onClick={() => setPlan({ label: opt.label, value: opt.value })}
                  >
                    <span className="mx-auto text-base py-1 text-sm">
                      {opt.label}
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
            {showDiscoutCode &&
              <div className='mt-2'>
                <Input id="discountCode" placeholder='請輸入折扣碼' className='rounded-full w-11/12 mx-auto h-9 border-color pl-4' />
              </div>}

            <Button className="w-full mt-2 h-12 text-xl" onClick={handleSubmitForm}>
              <span className={`${isPending && 'hidden'} text-2xl`}>立即預約</span>
              <RingLoader speedMultiplier={1.5} size={25} color="#FFF" loading={isPending} />
            </Button>
          </form>
          <div className="flex text-gray-500 gap-2 mt-1 -mb-2 mr-3 justify-end text-sm">
            <a target='_blank' href="/course/introduction">課程介紹</a>
            <a target='_blank' href="/course/note">上課須知</a>
          </div>
        </div>

        {
          !isReservePage &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid place-items-center h-[600px]">
              <div className="my-6">
                <BsFillCheckCircleFill className="mx-auto text-green-800 text-4xl mb-1" />
                <span className="flex text-[50px] gap-3">預約成功</span>
                <div className="text-center text-gray-400">{plan.label}</div>
                {plan.label.startsWith('點數') && <div className="text-center text-gray-400">剩餘點數{`${session?.user?.point - Number(plan.value)}`}點</div>}
              </div>
              <div className="w-full mt-auto">
                <div className="text-center max-w-fit mx-auto text-gray-400 cursor-pointer" onClick={() => setOpen(false)}>繼續選課</div>
                <Link href="/user"><Button variant="secondary" className="w-full h-10 my-3 text-xl">查看個人課表</Button></Link>
                <ScheduleHref course={course}>
                  <Button className="w-full text-xl h-10">加入行事曆 </Button>
                </ScheduleHref>
              </div>
            </div>
          </motion.div>
        }
      </DialogContent >
    </Dialog >
  )
}
