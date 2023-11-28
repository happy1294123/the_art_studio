import { DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { useCourse } from '@/context/ManageCourseContent';
import { MyCourse } from '@/type'
import React from 'react'
import { BiTime } from 'react-icons/bi';
import Image from 'next/image'
import { GoPerson } from 'react-icons/go';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/table/data-table';
import { getColumns } from './reserve-columns'
import CreateReserve from './CreateReserve';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type Props = {
  courseForm: MyCourse,
  isTeacherMode?: boolean
  // setCourseForm: Dispatch<Course | null>
}

export default function CourseDetail({ courseForm, isTeacherMode }: Props) {
  const { courseType, coursesMutate } = useCourse()
  const typeColor = courseType?.find(type => type.name === courseForm.type)?.color
  const current_rez = courseForm.Reservation?.filter(r => r.state === 'SUCCESS')?.length || 0
  const startCourseTime = (new Date(`${courseForm.date} ${courseForm.start_time}`)).getTime()
  const nowTime = (new Date()).getTime() as number

  const getCourseState = () => {
    if (startCourseTime < nowTime) {
      const endCourseTime = (new Date(`${courseForm.date} ${courseForm.end_time}`)).getTime()
      if (endCourseTime > nowTime) {
        return '上課中'
      }
      return '已下課'
    }
    return current_rez >= courseForm.baseline_rez ? '開課成功' : '尚未開課'
  }
  const isLessThanThreeHours = (startCourseTime > nowTime && Math.abs(nowTime - startCourseTime) / 36e5 <= 3)

  const isPassCourse = getCourseState() === '上課中' || getCourseState() === '已下課'

  return (
    <>
      <DialogHeader className='text-left'>
        <DialogDescription>
          <div className="p-4 rounded-3xl mb-3 drop-shadow-lg border border-gray-300 shadow-md mt-6 text-black" >
            <div className="flex">
              <span className="font-bold text-lg tracking-wider">{courseForm.name}</span>
              <span className="my-auto ml-3 px-2 text-xs rounded-full" style={{ backgroundColor: typeColor }}>{courseForm.type}</span>
            </div>
            <div className="flex gap-2.5 ml-1">
              <BiTime className="my-auto" />
              <span>{courseForm.start_time} ~ {courseForm.end_time}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="w-6 h-6 my-auto rounded-full overflow-hidden">
                  <Image src={courseForm.teacher?.image || '/avatar/default_avatar.jpeg'} className="aspect-square h-full w-full" width={10} height={10} alt="teacher" />
                </div>
                <span className="my-auto">{courseForm.teacher?.name}</span>
              </div>
              <div className="flex gap-2">
                <div className="flex mt-auto">
                  <GoPerson className="text-xs mr-[2px] mt-[1px]" />
                  <span className="text-xs">{current_rez}/{courseForm.total_rez}</span>
                </div>
                {/* {isInUserPage ? getUserPageBtn() : getCoursePageSpan()} */}
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader >
      <div className='-mt-3 overflow-hidden'>
        <div >
          <Label htmlFor="">開課狀態：</Label>
          {getCourseState()}
          {isLessThanThreeHours
            && <span className='text-sm text-primary/80 ml-1'>
              (將於3小時內開課)
            </span>
          }
        </div>
        <div>
          <Label >預約人數：</Label>
          {current_rez > 0
            ? <>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className='flex justify-start gap-1 pb-2 -mt-[28px] ml-[73px] -mb-12 h-2 outline-none'
                  >
                    {current_rez} 人
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='rounded-2xl shadow-md drop-shadow-lg border border-gray-300 mt-2'>
                      <DataTable columns={getColumns(isPassCourse, isTeacherMode)} data={courseForm.Reservation} mutate={coursesMutate} customClass="border-none overflow-auto" />
                    </div>
                    {/* <div className='float-right -mt-4 mr-1'>
                      <BiSolidChevronsRight color="#B2B2B2" />
                    </div> */}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
            : '尚無預約'
          }
        </div>
        {!isTeacherMode && <CreateReserve courseForm={courseForm} />}
      </div>
    </>
  )
}
