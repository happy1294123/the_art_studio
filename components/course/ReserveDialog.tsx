import { useMemo } from 'react'
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
  course: Course
}

export default function ReserveDialog({ course }: Props) {
  const dateString = useMemo(() => {
    const date = new Date(course.date)
    return `${date.getMonth() + 1}/${date.getDate()}(${weekMap[date.getDay() as keyof typeof weekMap]})`
  }, [course])

  return (
    <>
      <Dialog>
        <DialogTrigger><Button>預約</Button></DialogTrigger>
        <DialogContent className="bg-white p-12 drop-shadow-2xl">
          <DialogHeader>
            <DialogTitle className='text-left'>
              <span className="font-bold text-3xl">{course.name}</span>
              <span className="my-auto ml-3 px-2 text-xs bg-secondary text-secondary-foreground rounded-full">{course.type.name}</span>
            </DialogTitle>
            <DialogDescription>
              <div className="flex gap-2">
                <BiTime className="my-auto text-xl" />
                <span>{dateString} {course.time}</span>
              </div>
              <div className="flex gap-2 my-2">
                <Image src={course.teacher_image} width={20} height={20} alt="teacher image" />
                <span className="my-auto">{course.teacher}</span>
              </div>
              <div className="flex text-left mt-8 leading-6">
                課程內容介紹課程內容介紹課程內容介紹課程內容介紹課程內容介紹
                課程內容介紹課程內容介紹課程內容介紹課程內容介紹課程內容介紹
                課程內容介紹課程內容介紹課程內容介紹課程內容介紹課程內容介紹
                課程內容介紹課程內容介紹課程內容介紹課程內容介紹課程內容介紹
              </div>
              <div className="flex-center m-5 p-5 bg-secondary text-secondary-foreground rounded-3xl">
                預約須知內容預約須知內容預約須知內容預約須知內容預約須知內容預約須知內容預約須知內容
              </div>
              <hr />
              <div>
                <span className="flex text-xl m-3">選擇方案</span>
                <Select>
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="請選擇" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="10">點數 10 點</SelectItem>
                    <SelectItem value="8">點數 10 點（折2點優惠）</SelectItem>
                    <SelectItem value="first">單次購買</SelectItem>
                    <SelectItem value="free">免費體驗</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full mt-5 h-10 text-xl">立即預約</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
