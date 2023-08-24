import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useRef } from "react"

type Props = {
  month: string,
  selectedDate: Date,
  setSelectedDate: any
}

export default function MyCalander({ month, selectedDate, setSelectedDate }: Props) {
  const ref = useRef(null)

  const handleClosePopover = () => {
    if (ref.current) {
      const currentRef = ref.current as HTMLElement
      currentRef.click()
    }
  }
  return (
    <>
      <Popover>
        <PopoverTrigger className="text-fontColor rounded-xl underline underline-offset-4 mb-3" ref={ref}>{month}</PopoverTrigger>
        <PopoverContent className="bg-white rounded-3xl ml-10 w-12/12">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            required={true}
            onDayClick={handleClosePopover}
          />
        </PopoverContent>
      </Popover >
    </>
  )
}
