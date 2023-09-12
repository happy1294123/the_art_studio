type Props = {
  date: Date
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

export default function DateHeading({ date }: Props) {
  return (
    <div className="text-center text-lg p-1 bg-bgColorSecondary rounded-full mb-1 md:">
      {date.getFullYear()}/
      {date.getMonth() + 1}/
      {date.getDate()}
      ({getWeekDayByDate(date)})
    </div>
  )
}

export function getWeekDayByDate(date: Date) {
  return weekDayMap[date.getDay() as keyof typeof weekDayMap]
}

export function getWeekDayByWeekIndex(dayIndex: number) {
  return weekDayMap[dayIndex as keyof typeof weekDayMap]
}