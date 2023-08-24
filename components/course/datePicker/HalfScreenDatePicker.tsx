import ReactDOM from "react-dom";
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from "react";

type Props = {
  selectedDate: Date,
  setSelectedDate: any
}

export default function HalfScreenDatePicker({ selectedDate, setSelectedDate }: Props) {
  const [domReady, setDomReady] = useState(false)
  useEffect(() => {
    setDomReady(true)
  }, [])

  return domReady ? ReactDOM.createPortal(
    <div className="bg-white rounded-3xl border border-gray-300">
      <div className="text-fontColor underline underline-offset-4 cursor-pointer absolute top-3 right-12" onClick={() => setSelectedDate(new Date())}>今天</div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        required={true}
        className="p-12"
      />
    </div>
    ,
    document.getElementById('HalfScreenDatePicker') as HTMLElement
  ) : null
}

