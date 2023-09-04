'use client'
import { useMemo, useRef } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import dateFormatter from '@/lib/dateFormatter'

import DateItems from './DateItems'
import MyCalander from './MyCalendar'

const createDateList = (coursesDateSet: string[]) => {
  const today = new Date()
  const start = new Date(today.setDate(today.getDate() - 2))
  const lastDay = new Date(coursesDateSet.slice(-1)[0])
  const end = new Date(lastDay.setDate(lastDay.getDate() + 3))
  const tempDateList: MyDate[] = [];
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
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
  weekDayMap: any
}

export default function OneLineDatePicker({ selectedDate, setSelectedDate, dateSet, weekDayMap }: Props) {
  const dateList = useMemo(() => createDateList(dateSet), [dateSet])

  // let keepScroll: any
  // const handleMoveScroll = (direction: 'left' | 'right') => {
  //   let dateDiv: any;
  //   const speed = direction === 'left' ? -100 : +100
  //   if (ref.current) {
  //     dateDiv = ref.current as HTMLElement
  //     keepScroll = setInterval(() => {
  //       dateDiv.scrollLeft += speed
  //     }, 50)
  //   }
  // }

  // const DisableMoveScroll = () => {
  //   clearInterval(keepScroll)
  // }

  return (
    <div className="w-full h-50 p-2 grid gap-2">
      <div className="flex justify-between -mb-4">
        <div className="md:hidden">
          <MyCalander dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <span className="text-gray-400 pb-2 rounded-xl underline underline-offset-4 cursor-pointer ml-auto" onClick={() => setSelectedDate(new Date())}>今天</span>
      </div>
      {/* <AiOutlineLeft className="absolute text-2xl mt-3 z-10 hidden md:block" onMouseDown={() => handleMoveScroll('left')} onMouseUp={DisableMoveScroll} />
        <AiOutlineRight className="absolute text-2xl mt-3 right-0 z-10 hidden md:block" onMouseDown={() => handleMoveScroll('right')} onMouseUp={DisableMoveScroll} /> */}
      {/* px-[300px] */}
      <DateItems dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} weekDayMap={weekDayMap} />
    </div >
  )
}

