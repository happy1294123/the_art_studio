import { useEffect, useMemo, useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '../ui/button'
import { BiTime } from 'react-icons/bi'
import Image from 'next/image'

const weekMap = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六'
}

type Props = {
  course: Course,
  open: boolean,
  setOpen: any
}

export default function ReserveDialog({ course, open, setOpen }: Props) {
  const [isReservePage, setIsReservePage] = useState(true)

  const dateString = useMemo(() => {
    const date = new Date(course.date)
    return `${date.getMonth() + 1}/${date.getDate()}(${weekMap[date.getDay() as keyof typeof weekMap]})`
  }, [course])

  const [plan, setPlan] = useState('')
  const [planOpt, setPlanOpt] = useState<Option[]>([])
  useEffect(() => {
    const fetchOpt = [
      {
        label: '點數 10 點',
        value: '10'
      },
      {
        label: '點數 8 點（折2點優惠）',
        value: '8'
      },
      {
        label: '單次購買',
        value: 'single'
      },
      {
        label: '免費體驗',
        value: 'free'
      }
    ]
    setPlanOpt(fetchOpt)
    setPlan(fetchOpt[0].value)
  }, [])

  const handleSubmitForm = async () => {
    console.log('reserve action')
    alert('判斷用戶是否登入')
    setIsReservePage(false)
  }

  const scheduleHref = useMemo(() => {
    const service = 'apple' // 依據個人資料獲取service
    return `https://calndr.link/d/event/?service=${service}&start=${course.date} ${course.start_time}&end=${course.date} ${course.end_time}&title=[媞藝術空間] — ${course.name}&timezone=Asia/Taipei`
  }, [course])

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger><Button>預約</Button></DialogTrigger>
        {isReservePage ?
          <DialogContent className="bg-white p-12 drop-shadow-2xl">
            <DialogHeader>
              <DialogTitle className='text-left'>
                <span className="font-bold text-3xl">{course.name}</span>
                <span className="ml-3 px-2 text-xs bg-secondary text-secondary-foreground rounded-full">{course.type}</span>
              </DialogTitle>
              <DialogDescription>
                <div className="flex gap-2">
                  <BiTime className="my-auto text-xl" />
                  <span>{dateString} {course.start_time} ~ {course.end_time}</span>
                </div>
                <div className="flex gap-2 my-2">
                  <Image src={course.teacher.image} width={20} height={20} alt="teacher image" />
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
            <div className="flex-center mx-5 p-5 bg-secondary text-secondary-foreground rounded-3xl">
              預約須知內容預約須知內容預約須知內容預約須知內容預約須知內容預約須知內容預約須知內容
            </div>
            <hr />
            <form action={handleSubmitForm}>
              <div>
                <span className="flex text-xl m-3">選擇方案</span>
                <Select onValueChange={(val) => setPlan(val)} defaultValue={planOpt[0]?.value}>
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
              <Button className="w-full mt-5 h-10 text-xl">立即預約</Button>
            </form>

          </DialogContent>
          : <DialogContent className="bg-white p-12 drop-shadow-2xl">
            <div className="grid place-items-center h-[600px]">
              <div className="my-6">
                <BsFillCheckCircleFill className="mx-auto text-green-800 text-4xl mb-1" />
                <span className="flex text-[50px] gap-3">預約成功</span>
                <div className="text-center text-gray-400">{plan === 'single' ? '單次體驗'
                  : plan === 'free' ? '免費體驗'
                    : `扣點數${plan}點`}</div>
                <div className="text-center text-gray-400">剩餘點數990點</div>
              </div>
              <div className="w-full mt-auto">
                <div className="underline text-center text-gray-400 cursor-pointer" onClick={() => setOpen(false)}>繼續選課</div>
                <Button variant="secondary" className="w-full h-10 my-3 text-xl">查看個人課表</Button>
                <Button className="w-full text-xl h-10"><a href={scheduleHref}>加入行事曆</a> </Button>
              </div>
            </div>
          </DialogContent>}
      </Dialog>
    </>
  )
}
