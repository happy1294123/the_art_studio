import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useMemo, useRef } from "react"
import { zhCN } from "date-fns/locale"

type Props = {
  selectedDate: Date,
  setSelectedDate: any
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

export default function MyCalander({ selectedDate, setSelectedDate }: Props) {
  const ref = useRef(null)
  const month = useMemo(() => monthMap[selectedDate.getMonth() as keyof typeof monthMap], [selectedDate])

  const handleClosePopover = () => {
    if (ref.current) {
      const currentRef = ref.current as HTMLElement
      currentRef.click()
    }
  }

  return (
    <Popover>
      <PopoverTrigger className="text-gray-400 rounded-xl underline underline-offset-4 mb-3" ref={ref}>{month}</PopoverTrigger>
      <PopoverContent className="bg-white rounded-3xl ml-10 w-12/12">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          required={true}
          onDayClick={handleClosePopover}
          locale={zhCN}
        />
      </PopoverContent>
    </Popover >
  )
}
