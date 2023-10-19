'use client'
import { useMemo } from 'react'
import dateFormatter from '@/lib/dateFormatter'
import DateItems from './DateItems'
import MyCalander from './MyCalendar'
import { MyDate } from '@/type'

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

type Props = {
  selectedDate: Date,
  setSelectedDate: Function,
  dateSet: string[],
}

export default function OneLineDatePicker({ selectedDate, setSelectedDate, dateSet }: Props) {
  const dateList = useMemo(() => createDateList(dateSet), [dateSet])

  return (
    <div className="w-full h-50 p-2 grid gap-2">
      <div className="flex justify-between -mb-4">
        <div className="flex md:hidden">
          <MyCalander dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <span className="text-gray-400 pb-2 rounded-xl underline underline-offset-4 cursor-pointer ml-auto" onClick={() => setSelectedDate(new Date())}>今天</span>
      </div>
      <DateItems dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div >
  )
}

