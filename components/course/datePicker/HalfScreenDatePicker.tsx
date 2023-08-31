'use client'
import { Calendar } from "@/components/ui/calendar"
import { zhCN } from "date-fns/locale"
import { useEffect, useState, useMemo } from "react"

type Props = {
  selectedDate: Date,
  setSelectedDate: any,
  dateSet: string[]
}

export default function HalfScreenDatePicker({ selectedDate, setSelectedDate, dateSet }: Props) {
  const disabledDays = useMemo(() => {
    const after = new Date(dateSet[dateSet.length - 1])
    const hasNotCourse: Date[] = []
    let date = new Date()
    while (date < after) {
      const dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      if (!dateSet.includes(dateString)) {
        hasNotCourse.push(date)
      }
      // console.log(hasNotCourse)
      date = new Date(date.setDate(date.getDate() + 1))
    }
    return [...hasNotCourse, { before: new Date(), after }]
  }, [dateSet])

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
        disabled={disabledDays}
      />
    </div>
  )
}

