import { Button } from '@/components/ui/button'
import { Course } from '@/type'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Select from 'react-select'
import style from './CreateReserveStyle.module.scss'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useCourse } from '@/lib/contexts/ManageCourseContent'
import toast from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import LoadingButton from '@/components/LoadingButton'

type Props = {
  courseForm: Course
}

export default function CreateReserve({ courseForm }: Props) {
  const { users, coursesMutate } = useCourse()
  const [formData, setFormaData] = useState({
    user_id: 0,
    point: String(courseForm.point),
    course_id: courseForm.id
  })

  const options = users?.map(user => {
    const serialNumber = user.serial_number ? `(${user.serial_number})` : ''
    return {
      value: user.id,
      label: `${user.name} ${serialNumber}`
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await fetch('/api/manage/reservation', {
      method: 'POST',
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      toast('預約成功', getToastOption())
      coursesMutate()
    } else {
      toast('預約失敗', getToastOption('error'))
    }
    setIsLoading(false)
  }

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className='flex justify-start gap-1 text-[14px] py-0 pt-1'>新增預約</AccordionTrigger>
          <AccordionContent>
            <div className='mt-1 gap-2 space-y-2'>
              <div className='col-span-2 px-1'>
                <Label className='my-auto ml-3'>會員：</Label>
                <Select
                  options={options}
                  // value={formData.user_id}
                  onChange={(opt => setFormaData(prev => ({ ...prev, user_id: opt?.value as number })))}
                  placeholder="請選擇會員"
                  className={`react-select-container ${style.myReactSelect}`}
                  classNamePrefix="react-select"
                  maxMenuHeight={120}
                  // menuPlacement="top"
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 20,
                  })} />
              </div>
              <div className='px-1'>
                <Label className='my-auto ml-3'>點數：</Label>
                <Input
                  value={formData.point}
                  onChange={e => setFormaData(prev => ({ ...prev, point: e.target.value }))}
                  placeholder="請輸入點數"
                  className="rounded-full border-gray-300"
                  type='number'
                />
              </div>
              <LoadingButton isLoading={isLoading} className='w-full h-10 text-base' onClick={handleSubmit}>預約</LoadingButton>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
