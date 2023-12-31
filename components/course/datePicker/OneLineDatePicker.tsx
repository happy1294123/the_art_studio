'use client'
import { useMemo } from 'react'
import dateFormatter from '@/lib/dateFormatter'
import DateItems from './DateItems'
import MyCalander from './MyCalendar'
import { MyDate } from '@/type'
import { useReserveContent } from '@/context/ReserveContent'
import { Badge } from "@/components/ui/badge"
import StaticCourseSchedule from '../StaticCourseSchedule'
import { FaFilter } from 'react-icons/fa'

const createDateList = (coursesDateSet: string[]) => {
  const today = new Date()
  const lastDay = new Date(coursesDateSet.slice(-1)[0])
  const end = new Date(lastDay.setDate(lastDay.getDate() + 3))
  const tempDateList: MyDate[] = [];
  for (let d = today; d <= end; d.setDate(d.getDate() + 1)) {
    const year = d.getFullYear()
    const month = d.getMonth()
    const date = d.getDate()
    tempDateList.push({
      year,
      month,
      date,
      day: d.getDay(),
      hasCourse: coursesDateSet.includes(dateFormatter(d))
    })
  }
  return tempDateList
}

export default function OneLineDatePicker() {
  const { selectedDate, setSelectedDate, dateSet, staticSchedulePath } = useReserveContent()
  const dateList = useMemo(() => createDateList(dateSet), [dateSet])
  const { filter, setFilter } = useReserveContent()

  return (
    <div className="w-full h-50 p-2 grid gap-2">
      <div className="flex justify-between -mb-2">
        <div className="flex md:hidden">
          <MyCalander dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        {/* 選擇器 */}
        <button onClick={() => setFilter({ ...filter, isShow: true })} className='mb-3 ml-2'>
          {(filter.column && filter.value) ? (
            <Badge className='bg-bgColorSecondary text-black hover:bg-bgColorSecondary'>
              <FaFilter fontSize={12} color="black" className="mr-1" />
              {filter.showText}
            </Badge>
          ) : <div className='flex items-center gap-1'>
            <FaFilter fontSize={12} color="black" />
            <span className='hidden md:block underline underline-offset-4'>篩選器</span>
          </div>}
        </button>
        <div className='ml-auto'>
          <StaticCourseSchedule staticSchedulePath={staticSchedulePath} />
          <span className=" pb-2 rounded-xl underline underline-offset-4 cursor-pointer" onClick={() => setSelectedDate(new Date())}>今天</span>
        </div>
      </div>
      <DateItems dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div >
  )
}

