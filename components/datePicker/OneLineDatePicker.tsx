'use client'
import { useEffect, useState } from "react"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import styles from './style.module.css'

export default function OneLineDatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dateList, setDateList] = useState<MyDate[]>([])
  const isSelectDate = (month: number, date: number): boolean => {
    if (selectedDate.getMonth() === month && selectedDate.getDate() === date) return true
    return false
  }

  useEffect(() => {
    const tempDateList: MyDate[] = [];
    [...Array(21).keys()].forEach(num => {
      const today = new Date()
      const deltaDate = new Date(today.setDate(today.getDate() + (num - 4)))
      const myDate: MyDate = {
        year: deltaDate.getFullYear(),
        month: deltaDate.getMonth(),
        date: deltaDate.getDate(),
        day: deltaDate.getDay()
      }
      tempDateList.push(myDate)
    })
    setDateList(tempDateList)
  }, [])

  const weekDayMap = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  }

  return (
    <div className="w-full h-50 p-2 grid gap-2">
      <div className="flex justify-between">
        <span className="bg-bgColor p-2 rounded-xl">八月</span>
        <span className="bg-bgColor p-2 rounded-xl">今天</span>
      </div>
      {/* TODO suspend loading */}
      <div className="w-[400px] h-14 relative">
        <AiOutlineLeft className="absolute text-2xl mt-3 z-10" />
        <AiOutlineRight className="absolute text-2xl mt-3 right-0 z-10" />

        <div className={`flex w-full absolute overflow-x-scroll gap-7 ${styles.myGradient}`}>
          {dateList.map(d => (
            <div key={`${d.month}/${d.date}`}
              className={`grid text-center ${isSelectDate(d.month, d.date) ? 'font-bold' : 'text-gray-400'} cursor-pointer`}
              onClick={() => console.log('123')}>
              <span>{weekDayMap[d.day as keyof typeof weekDayMap]}</span>
              <span>{d.date}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center bg-bgColor rounded-full">
        {selectedDate.getFullYear()}/
        {selectedDate.getMonth() + 1}/
        {selectedDate.getDate()}
        ({weekDayMap[selectedDate.getDay() as keyof typeof weekDayMap]})
      </div>
    </div >
  )
}

