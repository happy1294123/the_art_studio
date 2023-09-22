'use client'
import { Calendar } from "@/components/ui/calendar"
import { zhCN } from "date-fns/locale"
import { useMemo } from "react"
import dateFormatter from "@/lib/dateFormatter"

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
      const dateString = dateFormatter(date)
      if (!dateSet.includes(dateString)) {
        hasNotCourse.push(new Date(date))
      }
      date = new Date(date.setDate(date.getDate() + 1))
    }
    return [...hasNotCourse, { before: new Date(), after }]
  }, [dateSet])

  return (
    <>
      <div className="bg-white rounded-3xl border border-gray-300 flex-center relative mt-2">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          required={true}
          locale={zhCN}
          className="p-12"
          disabled={disabledDays}
        />
      </div>
    </>
  )
}