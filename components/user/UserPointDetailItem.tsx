import dateFormatter from '@/lib/dateFormatter'
import CourseTypeBadge from '../CourseTypeBadge'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { v4 as uuidv4 } from 'uuid';
import { BiTime } from 'react-icons/bi';
import Image from 'next/image'

type Props = {
  detail: {
    title: string,
    point: string,
    created_at: Date,
    balance?: number,
    courseDate?: string,
    courseStartTime?: string,
    courseEndTime?: string,
    courseType?: string,
    teacherName?: string,
    teacherImage?: string,
  }
}

export default function UserPointDetailItem({ detail }: Props) {
  const dateString = dateFormatter(new Date(detail.created_at))

  return (
    <AccordionItem value={uuidv4()}>
      <AccordionTrigger className='bg-bgColorOther rounded-2xl mb-1 p-3 px-5 flex text-fontColor text-lg hover:no-underline'>
        <div>
          {dateString.slice(5)}
          <span className='ml-5'>
            {detail.title} {detail.courseType && <CourseTypeBadge name={detail.courseType} className="border border-gray-400 text-xs" />}
          </span>
        </div>
        <div className='ml-auto'>
          <span className='tracking-widest'>
            {detail.point}點
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className={`bg-bgColorOther mx-3 mb-3 rounded-b-2xl p-3 shadow-lg border-b border-headingColor/70 ${detail.courseDate ? ' h-[65px]' : ' h-[40px]'}`}>
        <div className='flex justify-between'>
          <div className={`${!detail.courseDate && 'invisible'}`}>
            <div className="flex items-center gap-4">
              <BiTime className="ml-2 my-auto" />
              {detail.courseDate?.slice(5)} {detail.courseStartTime}~{detail.courseEndTime}
            </div>
            <div className='flex items-center gap-2'>
              {detail.teacherImage && (
                <div className="w-7 h-7 my-auto rounded-full overflow-hidden">
                  <Image src={detail.teacherImage} className="aspect-square h-full w-full" width={20} height={20} alt="teacher" />
                </div>
              )}
              <span className="my-auto ml-1">{detail.teacherName}</span>
            </div>
          </div>
          <div className='float-right mt-auto'>
            <span>剩餘點數：{detail.balance}點</span>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}