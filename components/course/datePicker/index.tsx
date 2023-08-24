'use client'
import { useMemo } from 'react'
import styles from './style.module.css'

import DateItems from './DateItems'
import MyCalander from './MyCalendar'
import HalfScreenDatePicker from './HalfScreenDatePicker'

const createDateList = () => {
  const today = new Date()
  const start = new Date(today.setDate(today.getDate() - 3))
  const end = new Date(today.setDate(today.getDate() + 30))
  const tempDateList: MyDate[] = [];
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    tempDateList.push({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      day: date.getDay()
    })
  }
  return tempDateList
}

const weekDayMap = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
}

const monthMap = {
  0: '一月',
  1: '二月',
  2: '三月',
  3: '四月',
  4: '五月',
  5: '六月',
  6: '七月',
  7: '八月',
  8: '九月',
  9: '十月',
  10: '十一月',
  11: '十二月',
}

type Props = {
  selectedDate: Date,
  setSelectedDate: Function,
  courses: Course[]
}

export default function OneLineDatePicker({ selectedDate, setSelectedDate, courses }: Props) {
  const dateList = useMemo(() => createDateList(), [])

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
      <div className="hidden md:block">
        <HalfScreenDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className="md:hidden">
        <div className="flex justify-between -mb-4">
          <MyCalander month={monthMap[selectedDate.getMonth() as keyof typeof monthMap]} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <span className="text-fontColor pb-2 rounded-xl underline underline-offset-4 cursor-pointer" onClick={() => setSelectedDate(new Date())}>今天</span>
        </div>
        <div className="w-full h-14 relative overflow-hidden">
          {/* <AiOutlineLeft className="absolute text-2xl mt-3 z-10 hidden md:block" onMouseDown={() => handleMoveScroll('left')} onMouseUp={DisableMoveScroll} />
            <AiOutlineRight className="absolute text-2xl mt-3 right-0 z-10 hidden md:block" onMouseDown={() => handleMoveScroll('right')} onMouseUp={DisableMoveScroll} /> */}

          <div className={`flex w-full absolute overflow-x-scroll scroll-smooth gap-8 snap-x pl-[500px] ${styles.myGradient}`}>
            <DateItems dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} weekDayMap={weekDayMap} />
          </div>
        </div>
      </div>

      <div className="text-center text-lg p-1 bg-bgColorSecondary rounded-full mb-1 md:">
        {selectedDate.getFullYear()}/
        {selectedDate.getMonth() + 1}/
        {selectedDate.getDate()}
        ({weekDayMap[selectedDate.getDay() as keyof typeof weekDayMap]})
      </div>
    </div >
  )
}

