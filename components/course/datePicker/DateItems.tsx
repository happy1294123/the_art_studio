import { MouseEvent } from 'react'

type Props = {
  dateList: MyDate[],
  selectedDate: Date,
  weekDayMap: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
  },
  setSelectedDate: Function
}

export default function DateItems({ dateList, selectedDate, setSelectedDate, weekDayMap }: Props) {
  const isSelectDate = (month: number, date: number): boolean => {
    if (selectedDate.getMonth() === month && selectedDate.getDate() === date) return true
    return false
  }

  const handleSelect = (e: MouseEvent): void => {
    const target = e.target as Element
    target.scrollIntoView({ behavior: 'smooth', inline: 'center' })

    // // set selectDate
    const parentNode = target.parentNode as HTMLElement
    if (parentNode.hasAttribute('data-date')) {
      const selectDate = parentNode.dataset.date as string
      setSelectedDate(new Date(selectDate))
    }
    document.querySelector('.my-popover-content')?.remove()
  }

  return (
    <>
      {dateList.map(d => (
        <div key={`${d.month}/${d.date}`}
          className={`grid text-center snap-center date-div
                    ${d.hasCourse ? 'font-bold' : 'text-gray-300'}
                      cursor-pointer`}
          data-date={`${d.year}/${d.month + 1}/${d.date}`}
          onClick={handleSelect}
          ref={isSelectDate(d.month, d.date) ? (node: HTMLDivElement) => node?.click() : null}
        >
          <span>{weekDayMap[d.day as keyof typeof weekDayMap]}</span>
          <span className={`${isSelectDate(d.month, d.date) ? 'bg-primary text-primary-foreground rounded-full' : null} ${d.date > 9 ? 'px-1' : 'px-2'} pt-[2px]`}>{d.date}</span>
        </div >
      ))
      }
    </>
  )
}
