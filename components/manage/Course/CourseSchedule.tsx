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
import { Progress } from "@/components/ui/progress"
import CourseTypeDialog from './CourseTypeDialog'
import { CourseContent } from '@/context/ManageCourseContent'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import CourseDetail from './CourseDialog/CourseDetail'
import { Switch } from "@/components/ui/switch"
import { Label } from '@/components/ui/label'
import { MyCourse, Teacher } from '@/type'
import dynamic from 'next/dynamic'
import { CourseType, User } from '@prisma/client'
import useSWR from 'swr'
import { ClipLoader } from 'react-spinners'
const UploadStaticScheduleDialog = dynamic(() => import('./UploadStaticScheduleDialog'))
const ModifyForm = dynamic(() => import('./CourseDialog/ModifyForm'))

type Props = {
  users?: User[],
  isTeacherMode?: boolean
}

export default function CourseSchedule({ users, isTeacherMode }: Props) {
  const { data: courses, mutate: coursesMutate, isLoading: courseLoading } = useSWR<MyCourse[]>(isTeacherMode ? '/api/teacher/course' : '/api/manage/course')
  const { data: courseType, mutate: courseTypeMutate } = useSWR<CourseType[]>('/api/manage/course/type')
  const { data: teacherOpt } = useSWR<Teacher[]>('api/manage/teacher')


  const [courseForm, setCourseForm] = useState<Partial<MyCourse> | null>(null)
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
      color: courseType?.find((type: { name: string | null }) => type.name === course.type)?.color,
      textColor: '#000',
      reservationNum: course.Reservation.filter(r => r.state === 'SUCCESS').length,
      base_rez: course.baseline_rez,
      total_rez: course.total_rez,
    }))
  }, [courseType, courses])

  const calendarRef = useRef(null)

  const handleDateClick = (dateInfo: any) => {
    if (isTeacherMode) return
    if (courseType?.length === 0) {
      toast('請先填寫課程種類', getToastOption('error'))
      return
    }
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
      setCourseForm({
        name: '',
        type: '空中課程',
        date: dateFormatter(),
        start_time: '',
        end_time: '',
        teacher_id: teacherOpt && teacherOpt[0].id || 0,
        total_rez: 4,
        baseline_rez: 2,
        point: 6,
        price: 600,
      })
    }
    setDialogState('modify')
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
    if (isTeacherMode) return
    const courseId = info.event._def.extendedProps.courseId
    const date = dateFormatter(info.event._instance.range.start)
    await fetch('/api/manage/course', {
      method: 'PUT',
      body: JSON.stringify({
        id: courseId,
        date
      })
    })
    const clickedCourse = courses?.find(c => c.id === courseId) as MyCourse
    clickedCourse.date = date
    if (coursesMutate) {
      await coursesMutate()
    }
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
        coursesMutate && coursesMutate()
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
        coursesMutate && coursesMutate()
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
  const [openCourseTypeDialog, setCourseTypeDialog] = useState(courseType?.length === 0)
  const [dialogState, setDialogState] = useState<'courseDetail' | 'modify'>('courseDetail')

  if (courseLoading) {
    return (<div className="flex-center">
      <ClipLoader color="#D1C0AD" />
    </div>)
  }

  return (<>
    <CourseContent.Provider value={{
      courses, coursesMutate, courseType, courseTypeMutate, teacherOpt, users
    }}>
      {!!courseForm && (<>
        <Dialog open={!!courseForm} onOpenChange={() => setCourseForm(null)}>
          <DialogContent className="bg-white w-11/12">
            {!isTeacherMode && (
              <div className={`absolute flex top-3 ${dialogState === 'courseDetail' ? 'right-9' : 'right-14'} ${!courseForm.id && 'hidden'}`}>
                <Label className='mt-2 mr-2' htmlFor='dialog-state'>預約/修改</Label>
                <Switch
                  id='dialog-state'
                  checked={dialogState === 'modify'}
                  onCheckedChange={checked => setDialogState(checked ? 'modify' : 'courseDetail')}
                />
              </div>
            )}
            {dialogState === 'courseDetail' && <CourseDetail courseForm={courseForm as MyCourse} isTeacherMode={isTeacherMode} />}
            {(dialogState === 'modify' && !isTeacherMode) && <ModifyForm courseForm={courseForm} setCourseForm={setCourseForm} />}
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
          editable={!isTeacherMode}
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
      {!isTeacherMode && (<>
        <Button variant="secondary" className='my-2 float-right' onClick={() => setOpenUploadScheduleDialog(true)} >靜態課表</Button>
        <Button variant="secondary" className='my-2 mx-2 float-right' onClick={() => setCourseTypeDialog(true)} >課程種類</Button>
        <CourseTypeDialog openDialog={openCourseTypeDialog} setOpenDialog={setCourseTypeDialog} />
        <UploadStaticScheduleDialog openDialog={openUploadScheduleDialog} setOpenDialog={setOpenUploadScheduleDialog} />
      </>)}
    </CourseContent.Provider>
  </>)
}

function renderEventContent(eventInfo: any) {
  const props = eventInfo.event._def.extendedProps

  return (<div className={`md:p-2 py-1 space-y-1 cursor-pointer mx-auto max-w-[120px] ${eventInfo.isPast && 'opacity-40'}`}>
    <div className='flex md:justify-between justify-center'>
      {eventInfo.timeText}
      <div className='hidden md:block'>{eventInfo.event.title}</div>
    </div>
    <div className='relative flex'>
      <div className="absolute flex-center w-full z-10 text-black/60">
        {props.reservationNum}/{props.total_rez}
      </div>
      <Progress value={(props.reservationNum / props.total_rez) * 100} className='mt-[1px]' />
    </div>
  </div>)
}