import { Dispatch } from 'react'
import ReserveDialogUpper from "../course/ReserveDialogUpper"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import ScheduleHref from '@/components/ScheduleHref'
import { KeyedMutator } from 'swr'

type Props = {
  open: boolean,
  setOpen: Dispatch<boolean>,
  course: Course,
  current_rez: number,
  mutateReservation: KeyedMutator<Record<string, Reservation[]>> | undefined,
}

export default function UserCourseDialog({ open, setOpen, course, current_rez, mutateReservation }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white p-8 drop-shadow-2xl 
                    data-[state=open]:animate-[dialog-content-show_300ms]
                    data-[state=closed]:animate-[dialog-content-hide_300ms]">
        <div>
          <ReserveDialogUpper course={course} isUser={true} setOpen={setOpen} mutateReservation={mutateReservation} />
          {current_rez >= course.baseline_rez
            ? <div className="text-xl text-center">已開課</div>
            : (<>
              <div className='text-center'>多{course.baseline_rez - current_rez}位學員即可開課</div>
              <Button variant="secondary" className="w-full h-10 mt-3 text-xl" onClick={() => alert('share')}>分享給好友</Button>
            </>)
          }
          <ScheduleHref course={course}>
            <Button className="w-full h-10 mt-3 text-xl">加入行事曆</Button>
          </ScheduleHref>
        </div >
      </DialogContent >
    </Dialog >
  )
}
