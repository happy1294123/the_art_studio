import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'react-hot-toast'
import getToastOption from "@/lib/getToastOption"
import RingLoader from 'react-spinners/RingLoader'
import { AiFillDelete } from 'react-icons/ai'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCourse } from "@/context/ManageCourseContent"
import { Dispatch, useEffect, useState } from "react"
import { MyCourse, Teacher } from "@/type"

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: '不得小於1個字元'
  }).max(6, {
    message: '不得大於6個字元'
  }).optional(),
  type: z.string().nullable().optional(),
  date: z.string().optional(),
  start_time: z.string().length(5, {
    message: '24進制，ex. 23:59'
  }).optional(),
  end_time: z.string().length(5, {
    message: '24進制，ex. 23:59'
  }).optional(),
  teacher_id: z.coerce.number().optional(),
  baseline_rez: z.coerce.number().optional(),
  total_rez: z.coerce.number().optional(),
  point: z.coerce.number().optional(),
  price: z.coerce.number().optional(),
})

type Props = {
  courseForm: Partial<MyCourse>,
  setCourseForm: Dispatch<MyCourse | null>
}

export default function ModifyContent({ courseForm, setCourseForm }: Props) {
  const {
    coursesMutate,
    courseType,
    teacherOpt,
  } = useCourse()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: courseForm
  })
  const teacher_id = form.watch('teacher_id')
  const type = form.watch('type')
  useEffect(() => {
    if (type === '空中課程' || type === '兒童課程') {
      form.setValue('point', 6)
      form.setValue('price', 600)
    } else if (type === '地面課程') {
      form.setValue('point', 5)
      form.setValue('price', 500)
    }
  }, [form, type])
  const start_time = form.watch('start_time')
  useEffect(() => {
    if (start_time) {
      setTimeout(() => {
        const nextHour = parseInt(start_time?.slice(0, 2)) + 1
        const start_time_min = start_time.slice(-2)
        form.setValue('end_time', `${nextHour}:${start_time_min}`)
      }, 500)
    }
  }, [form, start_time])

  useEffect(() => {
    setTimeout(() => {
      document.getElementById('name-input')?.blur()
    })
  }, [])

  const [loading, setLoading] = useState(false)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const res = await fetch('/api/manage/course', {
      method: courseForm.id ? 'PUT' : 'POST',
      body: JSON.stringify(values)
    })
    if (res.ok) {
      coursesMutate && coursesMutate()
      toast(courseForm.id ? '修改成功' : '新增成功', getToastOption())
    }
    setLoading(false)
    setCourseForm(null)
  }

  const handleDeleteCourse = async () => {
    const isConfirm = confirm('確定要刪除該課程嗎？')
    if (!isConfirm) return
    const res = await fetch('/api/manage/course', {
      method: 'DELETE',
      body: JSON.stringify(courseForm.id)
    })
    if (res.ok) {
      toast('刪除成功', getToastOption())
      setCourseForm(null)
      coursesMutate && coursesMutate()
    } else {
      toast('刪除失敗', getToastOption('error'))
    }
  }

  return (
    <DialogHeader>
      <DialogTitle className="flex justify-between">
        {courseForm.id ? '修改課程' : '新增課程'}
        <span className={`cursor-pointer -mt-[10px] mr-3 text-black/50 ${!courseForm.id && 'invisible'}`}
          onClick={handleDeleteCourse}><AiFillDelete />
        </span >
      </DialogTitle>
      <DialogDescription>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="text-black text-left md:grid grid-cols-2">
              {/* className="p-4 rounded-3xl mb-3 border border-gray-300 shadow-md mt-3 text-black" */}
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名稱：</FormLabel>
                      <FormControl>
                        <input
                          id="name-input"
                          className="font-bold tracking-wider w-[120px] pl-2"
                          placeholder="課程名稱"
                          {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>日期：</FormLabel>
                      <FormControl>
                        <input className="pl-2 w-[110px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2.5">
                  {/* <BiTime className="mt-1" /> */}
                  <FormField
                    control={form.control}
                    name="start_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>時間：</FormLabel>
                        <FormControl>
                          <input className=" w-[60px]"
                            placeholder="開始"
                            {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span className="mt-2 -mr-3 -ml-2">~</span>
                  <FormField
                    control={form.control}
                    name="end_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <input className=" w-[60px]"
                            placeholder="結束"
                            {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* <hr className="mb-2" /> */}
                <div className="flex">
                  <div className="mt-2 ml-2">種類：</div>
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem key={Date.now()}>
                        <Select onValueChange={field.onChange} defaultValue={field.value || '空中課程'}>
                          <FormControl>
                            <SelectTrigger className="mt-1 ml-3 text-xs rounded-full w-[90px] h-6 border-none"
                              style={{ backgroundColor: courseType?.find(type => type.name === (field.value || '空中課程'))?.color }}>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-bgColor border-headingColor rounded-2xl shadow-xl">
                            <SelectItem value="空中課程">空中課程</SelectItem>
                            <SelectItem value="地面課程">地面課程</SelectItem>
                            <SelectItem value="兒童課程">兒童課程</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="ml-auto -mr-2">
                  </div>
                </div>
                <div className="flex gap-2 -mb-2">
                  <div className="ml-2 mt-3">老師：</div>
                  <div className="w-6 h-6 my-auto rounded-full overflow-hidden -mr-2" >
                    {teacher_id && <Image src={(teacherOpt?.find(opt => opt.id == teacher_id) as Teacher)?.image} className="aspect-square h-full w-full" width={10} height={10} alt="teacher" />}
                  </div>
                  < FormField
                    control={form.control}
                    name="teacher_id"
                    render={({ field }) => (
                      <FormItem key={Date.now()}>
                        <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                          <FormControl>
                            <SelectTrigger className="w-[80px] border-0.5">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-bgColor border-headingColor rounded-2xl shadow-xl -ml-6 -mt-2">
                            {teacherOpt?.map(opt => (
                              <SelectItem key={opt.id} value={String(opt.id)}>{opt.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                </div>
              </div>
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="baseline_rez"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>最低人數：</FormLabel>
                      <FormControl>
                        <input type="number" className="w-[35px] " {...field} />
                      </FormControl>
                      <FormMessage />
                      人
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total_rez"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>最高人數：</FormLabel>
                      <FormControl>
                        <input type="number" className="w-[35px]" {...field} />
                      </FormControl>
                      <FormMessage />
                      人
                    </FormItem>
                  )}
                />
                <div>
                  <FormField
                    control={form.control}
                    name="point"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>課程點數：</FormLabel>
                        <FormControl>
                          <input type="number" className="pl-2 w-[35px] text-sm" {...field} />
                        </FormControl>
                        <FormMessage />
                        點
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>單次價位：</FormLabel>
                        <FormControl>
                          <input type="number" className="w-[50px] text-sm" {...field} />
                        </FormControl>
                        <FormMessage />
                        元
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-2 col-span-2">
                <div className="flex mt-4 text-xs">
                </div>
                <Button className="mt-2 w-full">
                  <span className={`${loading && 'hidden'}`}>{courseForm.id ? '修改' : '新增'}</span>
                  <RingLoader speedMultiplier={1.5} size={25} color="#FFF" loading={loading} />
                </Button>
              </div>
            </form >
          </Form >
        </div >
      </DialogDescription >
    </DialogHeader >
  )
}