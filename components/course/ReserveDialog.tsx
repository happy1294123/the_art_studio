import { useState, useEffect, useMemo, Dispatch, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BiTime } from 'react-icons/bi'
import RingLoader from 'react-spinners/RingLoader'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import Image from "next/image"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { AiFillInfoCircle } from 'react-icons/ai'
import Link from 'next/link'
import { KeyedMutator } from 'swr'

type Props = {
  open: boolean,
  setOpen: Dispatch<boolean>,
  course: Course,
  weekDay: string,
  mutate: KeyedMutator<Course[]>
}
export default function ReserveDialog({ open, setOpen, course, weekDay, mutate }: Props) {
  const [isReservePage, setIsReservePage] = useState(true)
  const [planOpt, setPlanOpt] = useState<Option[]>([])
  const [plan, setPlan] = useState({ label: '', value: '' })
  const dateString = useMemo(() => {
    const date = new Date(course.date)
    return `${date.getMonth() + 1}/${date.getDate()}(${weekDay})`
  }, [course.date, weekDay])

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
  }, [])

  const router = useRouter()
  const { data: session }: any = useSession()
  const [isPending, startTransition] = useTransition()
  const handleSubmitForm = () => {
    if (!session) {
      toast('請先登入會員', {
        icon: <AiFillInfoCircle className="my-auto text-xl" />,
        style: {
          borderRadius: '20px',
          backgroundColor: '#D1C0AD',
          color: '#6C370D',
        }
      })
      router.push('/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fcourse')
      return
    }

    startTransition(async () => {
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
        mutate()
      } else {
        const message = await res.json()
        toast(message, {
          icon: <AiFillInfoCircle className="my-auto text-xl" />,
          style: {
            borderRadius: '30px',
            backgroundColor: '#FFF5ED',
            color: '#6C370D',
            border: '2px solid #D1C0AD'
          }
        })
      }
    })
  }

  const scheduleHref = useMemo(() => {
    const service = 'apple' // 依據個人資料獲取service
    return `https://calndr.link/d/event/?service=${service}&start=${course.date} ${course.start_time}&end=${course.date} ${course.end_time}&title=[媞藝術空間] — ${course.name}&timezone=Asia/Taipei`
  }, [course])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white p-12 drop-shadow-2xl 
                    data-[state=open]:animate-[dialog-content-show_300ms]
                    data-[state=closed]:animate-[dialog-content-hide_300ms]">
        <div className={`${isReservePage ? 'block' : 'hidden'}`}>
          <DialogHeader>
            <DialogTitle className='text-left'>
              <span className="font-bold text-3xl">{course.name}</span>
              <span className="ml-3 px-2 text-xs bg-secondary text-secondary-foreground rounded-full">{course.type}</span>
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              <div className="flex gap-2">
                <BiTime className="my-auto text-xl" />
                <span>{dateString} {course.start_time} ~ {course.end_time}</span>
              </div>
              <div className="flex gap-2 my-2">
                <div className="w-6 h-6 my-auto rounded-full overflow-hidden">
                  <Image src={course.teacher.image} className="aspect-square h-full w-full" width={10} height={10} alt="teacher" />
                </div>
                <span className="my-auto">{course.teacher.name}</span>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="flex text-left mt-4 leading-6">
            課程內容介紹課程內容介紹課程內容介紹課程內容介紹課程內容介紹
            課程內容介紹課程內容介紹課程內容介紹課程內容介紹課程內容介紹
            課程內容介紹課程內容介紹課程內容介紹課程內容介紹課程內容介紹
            課程內容介紹課程內容介紹課程內容介紹課程內容介紹課程內容介紹
          </div>
          <div className="flex-center mx-5 p-5 bg-secondary text-secondary-foreground rounded-3xl my-3">
            預約須知內容預約須知內容預約須知內容預約須知內容預約須知內容預約須知內容預約須知內容
          </div>
          <hr />
          <form action={handleSubmitForm}>
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
            <Button className="w-full mt-5 h-10 text-xl">
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
                <a href={scheduleHref}><Button className="w-full text-xl h-10">加入行事曆 </Button></a>
              </div>
            </div>
          </motion.div>
        }
      </DialogContent>
    </Dialog>
  )
}
