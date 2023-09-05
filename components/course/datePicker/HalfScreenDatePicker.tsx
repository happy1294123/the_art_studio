'use client'
import { Calendar } from "@/components/ui/calendar"
import { zhCN } from "date-fns/locale"
import { useEffect, useState, useMemo } from "react"
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

  const [numberOfMonths, setNumberOfMonths] = useState(1)
  useEffect(() => {
    const checkNumberOfMonths = () => setNumberOfMonths(window.innerWidth > 1300 ? 2 : 1)
    checkNumberOfMonths()
    window.addEventListener('resize', checkNumberOfMonths)
    return () => window.removeEventListener('resize', checkNumberOfMonths)
  }, [])

  return (
    <div className="bg-white rounded-3xl border border-gray-300 flex-center relative">
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

//  try fullcalendar

// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin from "@fullcalendar/interaction";

// function renderEventContent(eventInfo: any) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//       <span>{eventInfo.extendedProps}</span>
//     </>
//   )
// }

// const handleDateSelect = (info: any) => {
//   console.log(info)

// }

// const handleEventClick = (info: any) => {
//   console.log(info)
// }

// const titleFormat = (date: any) => {
//   console.log('titleFormat', date)
//   // return '自定義月份名稱'
// }

// const datMap = {
//   4: '天',
//   5: '一',
//   6: '二',
//   7: '三',
//   8: '四',
//   9: '五',
//   10: '六',
// }

// const events = [
//   {
//     title: 'Meeting',
//     start: new Date(),
//     end: '2023-09-05T16:00:00'
//   }
// ]

// export default function DemoApp() {
//   return (
//     <div className='md:w-[400px] bg-white p-3 rounded-2xl'>
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView='dayGridMonth'
//         weekends={true}
//         events={events}
//         eventContent={renderEventContent}
//         // locale="zh-tw"
//         selectable={true}
//         select={handleDateSelect}
//         eventClick={handleEventClick}
//         titleFormat={titleFormat}
//         dayHeaderFormat={(info) => datMap[info.date.day as keyof typeof datMap]}
//         aspectRatio={0.8}
//       />
//     </div>
//   )
// }
