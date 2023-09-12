import { Dispatch } from 'react'
import ReserveDialogUpper from "../course/ReserveDialogUpper"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import ScheduleHref from '@/components/ScheduleHref'

type Props = {
  open: boolean,
  setOpen: Dispatch<boolean>,
  course: Course,
  current_rez: number
}

export default function UserCourseDialog({ open, setOpen, course, current_rez }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white p-12 drop-shadow-2xl 
                    data-[state=open]:animate-[dialog-content-show_300ms]
                    data-[state=closed]:animate-[dialog-content-hide_300ms]">
        <div>
          <ReserveDialogUpper course={course} />
          <hr />
          {current_rez >= course.baseline_rez
            ? (<>
              <div className="text-3xl p-10 text-center"> 🎉 開課成功 🎉</div>
              <span className="float-right cursor-pointer text-gray-400 mr-2 -mb-1 w-fit">取消預約</span>
              <ScheduleHref course={course}>
                <Button className="w-full h-10 my-3 text-xl">加入行事曆</Button>
              </ScheduleHref>
            </>)
            : `尚差${course.baseline_rez - current_rez}位學生即可開課`}

        </div>
      </DialogContent>
    </Dialog>
  )
}
