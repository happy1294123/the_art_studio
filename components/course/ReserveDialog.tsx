import { useState, useEffect, Dispatch } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BsFillCheckCircleFill, BsInfoCircleFill } from 'react-icons/bs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import Link from 'next/link'
import { KeyedMutator } from 'swr'
import ReserveDialogUpper from '@/components/course/ReserveDialogUpper'
import ScheduleHref from '@/components/ScheduleHref'
import LoadingButton from '../LoadingButton'
import DiscountInput from '@/components/course/DiscountInput'
import { MyCourse } from '@/type'

type Props = {
  open: boolean,
  setOpen: Dispatch<boolean>,
  course: MyCourse,
  mutate?: KeyedMutator<MyCourse[]>
}

export default function ReserveDialog({ open, setOpen, course, mutate }: Props) {
  const [isReservePage, setIsReservePage] = useState(true)
  const [needWatchOpen, setNeedWatchOpen] = useState(false)
  const [planOpt, setPlanOpt] = useState([
    {
      label: `點數 ${course.point} 點`,
      value: `${course.point}`
    },
    {
      label: `單次 ${course.price} 元`,
      value: `${course.price}`
    }
  ])
  const [plan, setPlan] = useState(planOpt[0])
  useEffect(() => {
    setPlan(planOpt[0])
    document.dispatchEvent(new KeyboardEvent('keypress', { key: 'tab' }))
  }, [planOpt])

  const router = useRouter()
  const { data: session, update: updateSession }: any = useSession()
  const [isPending, setIsPending] = useState(false)
  const [discountId, setDiscountId] = useState(0)
  const [paymentId, setPaymentId] = useState(0)
  const handleSubmitForm = async () => {
    checkLogin()
    setIsPending(true)
    if (plan.label.startsWith('點數') && session.user.point < plan.value) {

      toast(<div className='space-y-1'>
        <div className='text-center'>
          <span>點數不足</span>
        </div>
        <div>
          <Button> <Link href="/user?tab=point">前往儲值</Link ></Button >
        </div>
      </div>, {
        style: {
          borderRadius: '30px',
          backgroundColor: '#FFF5ED',
          color: '#6C370D',
          border: '2px solid #D1C0AD'
        }
      })
      setIsPending(false)
      return
    }

    const res = await fetch('/api/reservation', {
      method: 'POST',
      body: JSON.stringify({
        course_id: course.id,
        plan_name: plan.label,
        plan_value: plan.value,
        discount_id: discountId
      })
    })
    if (res.ok) {
      setIsReservePage(false)
      setNeedWatchOpen(true)
      setIsPending(false)
      const { point, paymentId } = await res.json()
      updateSession({ point })
      setPaymentId(paymentId)
    } else {
      const message = await res.json()
      toast(message, getToastOption('error'))
      setIsPending(false)
    }
  }

  const checkLogin = () => {
    if (!session) {
      toast('請先登入會員', getToastOption('info', 'dark'))
      const callbackUrl = `${location.protocol}//${location.host}/course?id_date=${course.id}_${course.date}`
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
      setIsPending(false)
      throw Error('尚未登入')
    }
  }

  useEffect(() => {
    if (needWatchOpen && open === false && mutate) {
      mutate()
    }
  }, [needWatchOpen, open, mutate])
  // const [showDiscountCode, setShowDiscountCode] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white p-8 drop-shadow-2xl ">
        <div className={`${isReservePage ? 'block' : 'hidden'}`}>
          <ReserveDialogUpper course={course} />
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <span className='flex-center mx-auto mt-2 text-sm w-fit'>選擇方案</span>
              <div className={`w-11/12 mx-auto grid gap-2 ${planOpt.length > 1 && 'md:grid-cols-2'}`}>
                {planOpt.map(opt => (
                  <Badge
                    key={opt.label}
                    variant={`${opt.label === plan.label ? 'secondary' : 'outline'}`}
                    className="cursor-pointer"
                    onClick={() => setPlan({ label: opt.label, value: opt.value })}
                  >
                    <span className="mx-auto py-1 text-sm">
                      {opt.label}
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
            <DiscountInput planOpt={planOpt} setPlanOpt={setPlanOpt} setDiscountId={setDiscountId} />

            <LoadingButton className="w-full mt-2 h-12 text-xl" onClick={handleSubmitForm} isLoading={isPending}>
              <span className='text-2xl'>立即預約</span>
            </LoadingButton>
          </form>
          <div className="flex text-gray-500 gap-2 mt-1 -mb-2 mr-3 justify-end text-sm">
            <a target='_blank' href={`/course/introduction#${course.name}`}>課程介紹</a>
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
              {plan.label.startsWith('點數')
                && <div className="my-6">
                  <BsFillCheckCircleFill className="mx-auto text-green-800 text-4xl mb-1" />
                  <span className="flex text-[50px] gap-3">預約成功</span>
                  <div className="text-center text-gray-400">{plan.label}</div>
                  <div className="text-center text-gray-400">剩餘點數{`${session?.user?.point}`}點</div>
                </div>}

              {plan.label.startsWith('單次')
                && <div className="my-6">
                  <BsInfoCircleFill className="mx-auto text-headingColor text-4xl mb-1" />
                  <span className="flex text-[50px] gap-3">保留預約</span>
                  <div className="text-center text-gray-400">{plan.label}</div>
                  <div className='text-gray-400 text-center'>
                    <p>匯款後完成預約</p>
                  </div>
                  {paymentId && <div className='flex-center mt-1'><Button className='' onClick={() => router.push(`/user?tab=payment&id=${paymentId}`)}>前往匯款</Button></div>}
                </div>}
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
