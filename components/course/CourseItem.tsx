import { useState, useEffect, useMemo } from 'react'
import { BiTime } from 'react-icons/bi'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { GoPerson } from 'react-icons/go'
import Image from 'next/image'
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
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

type Props = {
  course: Course,
  weekDayMap: Record<number, string>
}

export default function CourseItem({ course, weekDayMap }: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const [isReservePage, setIsReservePage] = useState(true)
  const [plan, setPlan] = useState('')
  const [planOpt, setPlanOpt] = useState<Option[]>([])
  const dateString = useMemo(() => {
    const date = new Date(course.date)
    return `${date.getMonth() + 1}/${date.getDate()}(${weekDayMap[date.getDay() as keyof typeof weekDayMap]})`
  }, [course.date, weekDayMap])
  const scheduleHref = useMemo(() => {
    const service = 'apple' // 依據個人資料獲取service
    return `https://calndr.link/d/event/?service=${service}&start=${course.date} ${course.start_time}&end=${course.date} ${course.end_time}&title=[媞藝術空間] — ${course.name}&timezone=Asia/Taipei`
  }, [course])

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

  return (
    <div className={`p-4 rounded-3xl mb-3 drop-shadow-lg border border-gray-300 shadow-md ${course.current_rez === course.total_rez ? 'opacity-40' : 'cursor-pointer'}`} onClick={() => setOpenDialog(true)}>
      <div className="flex">
        <span className="font-bold text-lg tracking-wider">{course.name}</span>
        <span className="my-auto ml-3 px-2 text-xs bg-secondary text-secondary-foreground rounded-full">{course.type}</span>
      </div>
      <div className="flex gap-2">
        <BiTime className="my-auto" />
        <span>{course.start_time} ~ {course.end_time}</span>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Image src={course.teacher.image} width={20} height={20} alt="teacher image" />
          <span className="my-auto">{course.teacher.name}</span>
        </div>
        <div className="flex gap-2">
          <div className="flex mt-auto">
            <GoPerson className="text-xs mr-[2px] mt-[1px]" />
            <span className="text-xs">{course.current_rez}/{course.total_rez}</span>
          </div>
          {course.current_rez === course.total_rez
            ? <span className="px-4 text-sm mt-auto text-gray-800">額滿</span>
            : <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild><Button>預約</Button></DialogTrigger>
              {isReservePage ?
                <DialogContent className="bg-white p-12 drop-shadow-2xl">
                  <motion.div
                    key="dialog"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
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
                  </motion.div>
                </DialogContent>
                : <DialogContent className="bg-white p-12 drop-shadow-2xl">
                  <motion.div
                    key="dialogReserved"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
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
                        <div className="underline text-center text-gray-400 cursor-pointer" onClick={() => setOpenDialog(false)}>繼續選課</div>
                        <Button variant="secondary" className="w-full h-10 my-3 text-xl">查看個人課表</Button>
                        <Button className="w-full text-xl h-10"><a href={scheduleHref}>加入行事曆</a> </Button>
                      </div>
                    </div>
                  </motion.div>
                </DialogContent>}
            </Dialog>
          }
        </div>
      </div>
    </div >
  )
}
