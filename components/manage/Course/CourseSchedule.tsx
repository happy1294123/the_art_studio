"use client"
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import zhCn from '@fullcalendar/core/locales/zh-cn';
import style from './style.module.scss'
import { useState, useRef, useMemo, useEffect } from 'react';
import dateFormatter from '@/lib/dateFormatter'
import toast from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { Course } from '@/type'
import { Progress } from "@/components/ui/progress"
const UploadStaticScheduleDialog = dynamic(() => import('./UploadStaticScheduleDialog'))
import CourseTypeDialog from './CourseTypeDialog'
import { useCourse } from '@/lib/contexts/ManageCourseContent'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import CourseDetail from './CourseDialog/CourseDetail'
const ModifyForm = dynamic(() => import('./CourseDialog/ModifyForm'))
import { Switch } from "@/components/ui/switch"
import { Label } from '@/components/ui/label'

export default function CourseSchedule() {
  const {
    courses,
    coursesMutate,
    courseType,
    courseTypeMutate,
    teacherOpt,
  } = useCourse()
  const [courseForm, setCourseForm] = useState<Partial<Course> | null>(null)
  useEffect(() => {
    if (!courseForm) return
    const selectedCourse = courses?.find(c => c.id === courseForm.id)
    if (!selectedCourse) return
    if (courseForm?.Reservation?.length !== selectedCourse?.Reservation.length) {
      setCourseForm(selectedCourse)
    }
  }, [courses, courseForm])

  const events = useMemo(() => {
    return courses?.map(course => ({
      title: course.name,
      courseId: course.id,
      date: course.date,
      start: `${course.date.replaceAll('/', '-')} ${course.start_time}`,
      end: `${course.date.replaceAll('/', '-')} ${course.end_time}`,
      color: courseType.find((type: { name: string | null }) => type.name === course.type)?.color,
      textColor: '#000',
      reservationNum: course.Reservation.length,
      base_rez: course.baseline_rez,
      total_rez: course.total_rez,
    }))
  }, [courseType, courses])

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
      setDialogState('modify')
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

  const handleClickEvent = (eventInfo: any) => {
    const clickedCourse = courses?.find(c => c.id === eventInfo.event.extendedProps.courseId)
    if (!clickedCourse) {
      alert('有錯誤')
      return
    }

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
    await coursesMutate()
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

  const [openUploadScheduleDialog, setOpenUploadScheduleDialog] = useState(false)
  const [openCourseTypeDialog, setCourseTypeDialog] = useState(false)
  const [dialogState, setDialogState] = useState('courseDetail')
  return (<>
    {!!courseForm && (<>
      <Dialog open={!!courseForm} onOpenChange={() => setCourseForm(null)}>
        <DialogContent className="bg-white w-11/12">
          <div className={`absolute flex top-3 ${dialogState === 'courseDetail' ? 'right-9' : 'right-14'} ${!courseForm.id && 'hidden'}`}>
            <Label className='mt-2 mr-2' htmlFor='dialog-state'>預約/修改</Label>
            <Switch
              id='dialog-state'
              checked={dialogState === 'modify'}
              onCheckedChange={checked => setDialogState(checked ? 'modify' : 'courseDetail')}
            />
          </div>
          {dialogState === 'courseDetail' && <CourseDetail courseForm={courseForm as Course} />}
          {dialogState === 'modify' && <ModifyForm courseForm={courseForm} setCourseForm={setCourseForm} />}
        </DialogContent>
      </Dialog>
    </>)}

    <div className={`bg-bgColorOther p-3 rounded-3xl relative overflow-auto ${style.myCalendar}`}>
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
    </div>
    <Button variant="secondary" className='my-2 float-right' onClick={() => setOpenUploadScheduleDialog(true)} >靜態課表</Button>
    <Button variant="secondary" className='my-2 mx-2 float-right' onClick={() => setCourseTypeDialog(true)} >課程種類</Button>
    {openUploadScheduleDialog && <UploadStaticScheduleDialog openDialog={openUploadScheduleDialog} setOpenDialog={setOpenUploadScheduleDialog} />}
    {openCourseTypeDialog && <CourseTypeDialog openDialog={openCourseTypeDialog} setOpenDialog={setCourseTypeDialog} courseTypeMutate={courseTypeMutate} courseType={courseType} />}
  </>)
}

function renderEventContent(eventInfo: any) {
  const props = eventInfo.event._def.extendedProps

  return (<div className='md:p-2 py-1 space-y-1'>
    <div className='flex justify-center md:justify-start'>
      {eventInfo.timeText}
      {/* {props.reservationNum >= props.base_rez
        && <span className='ml-auto mt-1'>
          <BsCheck />
        </span>
      } */}
    </div>
    <div className='hidden md:block'>{eventInfo.event.title}</div>
    <div className='relative flex'>
      <div className="absolute flex-center w-full z-10 text-black/60">
        {props.reservationNum}/{props.total_rez}
      </div>
      <Progress value={(props.reservationNum / props.total_rez) * 100} className='mt-[1px]' />
    </div>
  </div>)
}