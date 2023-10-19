"use client"
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import zhCn from '@fullcalendar/core/locales/zh-cn';
import style from './style.module.scss'
import { useState, useRef, useMemo } from 'react';
import getColorByCourseType from '@/lib/course/getColorByCourseType'
import EditCourseItem from '@/components/manage/Course/EditCourseItem'
import dateFormatter from '@/lib/dateFormatter'
import toast from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import { KeyedMutator } from 'swr'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { Course, Teacher } from '@/type'
const UploadStaticScheduleDialog = dynamic(() => import('./UploadStaticScheduleDialog'))

type Props = {
  courses?: Course[],
  coursesMutate: KeyedMutator<Course[]>,
  teacherOpt?: Teacher[]
}

export default function NewCourseForm({ courses, coursesMutate, teacherOpt }: Props) {
  const events = useMemo(() => {
    return courses?.map(course => ({
      title: course.name,
      courseId: course.id,
      date: course.date,
      start: `${course.date.replaceAll('/', '-')} ${course.start_time}`,
      end: `${course.date.replaceAll('/', '-')} ${course.end_time}`,
      color: getColorByCourseType(course.type),
      textColor: '#000'
    }))
  }, [courses])

  const calendarRef = useRef(null)
  const handleDateClick = (dateInfo: any) => {
    const clickDate = new Date(dateInfo.date)
    const delta = {
      start: clickDate.getDay() === 0 ? -5 : +2,
      end: clickDate.getDay() === 0 ? +6 : +8,
    }

    // switch to week
    if (dateInfo.view.type === 'dayGridMonth' && calendarRef.current) {
      const calendar = calendarRef?.current as FullCalendar
      const start = new Date(clickDate.setDate(clickDate.getDate() - clickDate.getDay() + delta.start)).toISOString().slice(0, 10)
      const end = new Date(clickDate.setDate(clickDate.getDate() - clickDate.getDay() + delta.end)).toISOString().slice(0, 10)
      // setWeekRange({ start, end })
      calendar.getApi().changeView('timeGrid', { start, end });
      calendar.getApi().changeView('dayGridWeek')
    }

    // add course
    if (dateInfo.view.type === 'dayGridWeek') {
      const date = dateFormatter(clickDate)
      setCourseForm({
        name: '',
        type: '空中課程',
        date,
        start_time: '',
        end_time: '',
        teacher_id: teacherOpt && teacherOpt[0].id || 0,
        total_rez: 4,
        baseline_rez: 2,
        point: 6,
        price: 600,
      })
    }
  }

  const [courseForm, setCourseForm] = useState<Partial<Course> | null>()
  const handleClickEvent = (eventInfo: any) => {
    const clickedCourse = courses?.find(c => c.id === eventInfo.event.extendedProps.courseId)
    if (!clickedCourse) {
      alert('有錯誤')
      return
    }
    // console.log(clickedCourse)
    setCourseForm(clickedCourse)
  }

  const handleDrag = async (info: any) => {
    const courseId = info.event._def.extendedProps.courseId
    const date = dateFormatter(info.event._instance.range.start)
    await fetch('/api/manage/course', {
      method: 'PUT',
      body: JSON.stringify({
        id: courseId,
        date
      })
    })
    const clickedCourse = courses?.find(c => c.id === courseId) as Course
    clickedCourse.date = date
    await coursesMutate(clickedCourse)
    setCourseForm(clickedCourse)
  }

  const handleCopyWeekToNextWeek = async () => {
    if (!confirm('是否將當週課表視為下週課表？')) return
    if (calendarRef.current) {
      const calendar = calendarRef?.current as FullCalendar
      const weekStartDate = dateFormatter(calendar.getApi().view.currentStart)
      const weekEndDate = dateFormatter(calendar.getApi().view.currentEnd)
      const filtedEvents = events?.filter(event => weekStartDate <= event.date && event.date <= weekEndDate)
      const res = await fetch('/api/manage/course/copy', {
        method: 'POST',
        body: JSON.stringify({
          to: 'next_week',
          events: filtedEvents
        })
      })
      if (res.ok) {
        coursesMutate()
        toast('當週 -> 下週，複製成功', getToastOption())
      }
    }
  }

  const handleCopyWeekToNext3Week = async () => {
    if (!confirm('是否將當週課表視為下3週課表？')) return
    if (calendarRef.current) {
      const calendar = calendarRef?.current as FullCalendar
      const weekStartDate = dateFormatter(calendar.getApi().view.currentStart)
      const weekEndDate = dateFormatter(calendar.getApi().view.currentEnd)
      const filtedEvents = events?.filter(event => weekStartDate <= event.date && event.date <= weekEndDate)
      // console.log(filtedEvents)
      const res = await fetch('/api/manage/course/copy', {
        method: 'POST',
        body: JSON.stringify({
          to: 'next_3week',
          events: filtedEvents
        })
      })
      if (res.ok) {
        coursesMutate()
        toast('當週 -> 下3週，複製成功', getToastOption())
      }
    }
  }

  const handleChangeView = (datainfo: any) => {
    if (datainfo.view.type === 'dayGridWeek' && calendarRef.current) {
      const calendar = calendarRef?.current as FullCalendar
      calendar.getApi().setOption('footerToolbar', {
        end: 'copyWeekToNextWeek copyWeekToNext3Week'
      })
    } else if (datainfo.view.type === 'dayGridMonth' && calendarRef.current) {
      const calendar = calendarRef?.current as FullCalendar
      calendar.getApi().setOption('footerToolbar', { end: '' })
    }
  }

  const [openDialog, setOpenDialog] = useState(false)
  return (<>
    {courseForm && <EditCourseItem course={courseForm} setCourseForm={setCourseForm} teacherOpt={teacherOpt} mutate={coursesMutate} />}
    {
      <div className={`bg-bgColorOther p-3 rounded-3xl ${style.myCalendar}`}>
        <FullCalendar
          initialView="dayGridMonth"
          height='auto'
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locale={zhCn}
          customButtons={{
            copyWeekToNextWeek: {
              text: '下週照舊',
              click: handleCopyWeekToNextWeek,
            },
            copyWeekToNext3Week: {
              text: '下3週照舊',
              click: handleCopyWeekToNext3Week
            }
          }}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
          selectable={true}
          datesSet={handleChangeView}
          // viewDidMount={handleChangeView}
          dateClick={handleDateClick}
          eventDrop={handleDrag}
          droppable={false}
          editable={true}
          eventClick={handleClickEvent}
          events={events}
          eventContent={renderEventContent}
          eventDisplay='block'
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
          }}
          ref={calendarRef}
        />
      </div>}
    <Button variant="secondary" className='my-2 float-right' onClick={() => setOpenDialog(true)} >更新靜態課表</Button>
    {openDialog && <UploadStaticScheduleDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />}
  </>)
}

function renderEventContent(eventInfo: any) {
  return (<div className='px-2'>
    <div className='grid'>{eventInfo.timeText}</div>
    <div className='grid'>{eventInfo.event.title}</div>
  </div>)
}