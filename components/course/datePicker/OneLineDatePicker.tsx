'use client'
import { useMemo, useRef } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import styles from './style.module.css'

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
      hasCourse: coursesDateSet.includes(`${year}/${month + 1}/${date}`)
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
  const ref = useRef<HTMLDivElement>(null)
  const dateList = useMemo(() => createDateList(dateSet), [dateSet])

  let keepScroll: any
  const handleMoveScroll = (direction: 'left' | 'right') => {
    let dateDiv: any;
    const speed = direction === 'left' ? -100 : +100
    if (ref.current) {
      dateDiv = ref.current as HTMLElement
      keepScroll = setInterval(() => {
        dateDiv.scrollLeft += speed
      }, 50)
    }
  }

  const DisableMoveScroll = () => {
    clearInterval(keepScroll)
  }

  return (
    <div className="w-full h-50 p-2 grid gap-2">
      <div className="flex justify-between -mb-4 md:hidden">
        <MyCalander dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <span className="text-gray-400 pb-2 rounded-xl underline underline-offset-4 cursor-pointer" onClick={() => setSelectedDate(new Date())}>今天</span>
      </div>
      <div className="w-full h-14 relative overflow-hidden">
        <AiOutlineLeft className="absolute text-2xl mt-3 z-10 hidden md:block" onMouseDown={() => handleMoveScroll('left')} onMouseUp={DisableMoveScroll} />
        <AiOutlineRight className="absolute text-2xl mt-3 right-0 z-10 hidden md:block" onMouseDown={() => handleMoveScroll('right')} onMouseUp={DisableMoveScroll} />
        <div className={`flex w-full absolute overflow-x-scroll scroll-smooth gap-8 snap-x px-[300px] ${styles.myGradient}`} ref={ref}>
          <DateItems dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} weekDayMap={weekDayMap} />
        </div>
      </div>
    </div >
  )
}

