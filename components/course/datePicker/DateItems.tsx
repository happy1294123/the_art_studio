import { MouseEvent, useState, useEffect, useRef } from 'react'
import styles from './style.module.css'

type Props = {
  dateList: MyDate[],
  selectedDate: Date,
  weekDayMap: Record<number, string>,
  setSelectedDate: Function
}

export default function DateItems({ dateList, selectedDate, setSelectedDate, weekDayMap }: Props) {
  const isSelectDate = (month: number, date: number): boolean => {
    if (selectedDate.getMonth() === month && selectedDate.getDate() === date) return true
    return false
  }

  const ref = useRef(null)
  const [smooth, setSmooth] = useState(false)
  useEffect(() => {
    setSmooth(true)

    const scroller = ref.current as unknown as HTMLElement
    if (scroller) {
      scroller.addEventListener('wheel', (ev: WheelEvent) => {
        ev.preventDefault();
        scroller.scrollLeft += (ev.deltaY + ev.deltaX);
      })
    }
    return scroller.removeEventListener('wheel', (ev: WheelEvent) => {
      ev.preventDefault();
      scroller.scrollLeft += (ev.deltaY + ev.deltaX);
    })
  }, [])

  const handleSelect = (e: MouseEvent): void => {
    const target = e.target as Element
    target.scrollIntoView({ inline: 'center' })

    // // set selectDate
    const parentNode = target.parentNode as HTMLElement
    if (parentNode.hasAttribute('data-date')) {
      const selectDate = parentNode.dataset.date as string
      setSelectedDate(new Date(selectDate))
    }
    document.querySelector('.my-popover-content')?.remove()
  }

  return (
    <div className={`w-full h-14 relative overflow-hidden ${styles.myGradient}`}>
      <div className={`flex w-full absolute overflow-x-scroll gap-8 px-[1000px] ${smooth && 'scroll-smooth'} ${styles.noScroll}`} ref={ref}>
        {dateList.map(d => (
          <div key={`${d.month}/${d.date}`}
            className={`grid text-center snap-center date-div
                    ${d.hasCourse ? 'font-bold' : 'text-gray-300'}
                      cursor-pointer `}
            data-date={`${d.year}/${d.month + 1}/${d.date}`}
            onClick={handleSelect}
            ref={isSelectDate(d.month, d.date) ? (node: HTMLDivElement) => node?.scrollIntoView({ inline: 'center' }) : null}
          >
            <span>{weekDayMap[d.day as keyof typeof weekDayMap]}</span>
            <span className={`${isSelectDate(d.month, d.date) ? 'bg-primary text-primary-foreground rounded-full' : null} ${d.date > 9 ? 'px-1' : 'px-2'} pt-[2px]`}>{d.date}</span>
          </div >
        ))
        }
      </div>
    </div >

  )
}
