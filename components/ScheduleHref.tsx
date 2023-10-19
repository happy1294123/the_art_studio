import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import dynamic from 'next/dynamic'
import { Course } from '@/type'
const SelectScheduleServiceDialog = dynamic(() => import('@/components/user/SelectScheduleServiceDialog'))

export default function ScheduleHref({
  children, course
}: {
  children: React.ReactNode, course: Course
}) {
  const [openDialog, setOpenDialog] = useState(false)
  const { data: session }: any = useSession()

  const handleDownSchedule = () => {
    if (!session.user) {
      toast('請先登入', getToastOption('info'))
    }
    if (!session.user.schedule_service) {
      setOpenDialog(true)
    } else {
      downloadSchedule()
    }
  }

  const downloadSchedule = (service?: string): void => {
    if (!service) {
      service = session.user.schedule_service
    }
    const scheduleHref = `https://calndr.link/d/event/?service=${service}&start=${course.date} ${course.start_time}&end=${course.date} ${course.end_time}&title=[媞藝術空間] — ${course.name}&timezone=Asia/Taipei`
    window.open(scheduleHref, '_blank')
  }

  return (
    <>
      <div onClick={handleDownSchedule}>
        {children}
      </div>
      {openDialog && <SelectScheduleServiceDialog openDialog={openDialog} setOpenDialog={setOpenDialog} downloadSchedule={downloadSchedule} />}
    </>
  )
}
