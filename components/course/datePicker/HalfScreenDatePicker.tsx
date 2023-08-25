'use client'
import { Calendar } from "@/components/ui/calendar"
import { zhCN } from "date-fns/locale"
import { useEffect, useState } from "react"

type Props = {
  selectedDate: Date,
  setSelectedDate: any,
  dateSet: string[]
}

export default function HalfScreenDatePicker({ selectedDate, setSelectedDate, dateSet }: Props) {
  const [numberOfMonths, setNumberOfMonths] = useState(1)
  useEffect(() => {
    const checkNumberOfMonths = () => setNumberOfMonths(window.innerWidth > 1300 ? 2 : 1)
    checkNumberOfMonths()
    window.addEventListener('resize', checkNumberOfMonths)
    return () => window.removeEventListener('resize', checkNumberOfMonths)
  }, [])

  return (
    <div className="bg-white rounded-3xl border border-gray-300 flex-center relative">
      <div className="text-gray-400 underline underline-offset-4 cursor-pointer absolute top-3 right-12" onClick={() => setSelectedDate(new Date())}>今天</div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        required={true}
        locale={zhCN}
        numberOfMonths={numberOfMonths}
        className="p-12"
        initialFocus
      />
    </div>
  )
}

