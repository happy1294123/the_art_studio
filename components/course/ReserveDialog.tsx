import { useState, useEffect, Dispatch } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import RingLoader from 'react-spinners/RingLoader'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { KeyedMutator } from 'swr'
import ReserveDialogUpper from '@/components/course/ReserveDialogUpper'
import getToastOption from '@/lib/getToastOption'
import ScheduleHref from '@/components/ScheduleHref'

type Props = {
  open: boolean,
  setOpen: Dispatch<boolean>,
  course: Course,
  mutate?: KeyedMutator<Course[]>
}

export default function ReserveDialog({ open, setOpen, course, mutate }: Props) {
  const [isReservePage, setIsReservePage] = useState(true)
  const [planOpt, setPlanOpt] = useState<Option[]>([])
  const [plan, setPlan] = useState({ label: '', value: '' })


  useEffect(() => {
    // TODO chose coupon first

    const fetchOpt = [
      {
        label: `點數 ${course.point} 點`,
        value: `${course.point}`
      },
      {
        // TODO fetch certain user
        label: '點數 8 點（折2點優惠）',
        value: '8'
      },
      {
        label: `單次購買 ${course.price}元`,
        value: `${course.price}`
      },
      {
        label: '免費體驗',
        value: '0'
      }
    ]
    setPlanOpt(fetchOpt)
    setPlan(fetchOpt[0])
  }, [course])

  const router = useRouter()
  const { data: session }: any = useSession()
  const [isPending, setIsPending] = useState(false)
  const handleSubmitForm = async () => {
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
      mutate && mutate()
      setIsPending(false)
    } else {
      const message = await res.json()
      toast(message, getToastOption('light'))
      setIsPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white p-8 drop-shadow-2xl 
                    data-[state=open]:animate-[dialog-content-show_300ms]
                    data-[state=closed]:animate-[dialog-content-hide_300ms]">
        <div className={`${isReservePage ? 'block' : 'hidden'}`}>
          <ReserveDialogUpper course={course} />
          <hr />
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <span className="flex text-xl m-3">選擇方案</span>
              <Select onValueChange={(val) => {
                const newPlan = planOpt.find(opt => opt.value === val) as Option
                setPlan(newPlan)
              }} defaultValue={plan.value}>
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue placeholder="請選擇" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {planOpt && planOpt.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full mt-5 h-10 text-xl" onClick={handleSubmitForm}>
              <span className={`${isPending && 'hidden'}`}>立即預約</span>
              <RingLoader speedMultiplier={1.5} size={25} color="#FFF" loading={isPending} />
            </Button>
          </form>
        </div>

        {!isReservePage &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid place-items-center h-[600px]">
              <div className="my-6">
                <BsFillCheckCircleFill className="mx-auto text-green-800 text-4xl mb-1" />
                {/* <span className="flex-center text-4xl">🎉</span> */}
                <span className="flex text-[50px] gap-3">預約成功</span>
                <div className="text-center text-gray-400">{plan.label}</div>
                {plan.label.startsWith('點數') && <div className="text-center text-gray-400">剩餘點數{`${session?.user?.point - Number(plan.value)}`}點</div>}
              </div>
              <div className="w-full mt-auto">
                <div className="underline text-center max-w-fit mx-auto text-gray-400 cursor-pointer" onClick={() => setOpen(false)}>繼續選課</div>
                <Link href="/user"><Button variant="secondary" className="w-full h-10 my-3 text-xl">查看個人課表</Button></Link>
                <ScheduleHref course={course}>
                  <Button className="w-full text-xl h-10">加入行事曆 </Button>
                </ScheduleHref>
              </div>
            </div>
          </motion.div>
        }
      </DialogContent>
    </Dialog>
  )
}
