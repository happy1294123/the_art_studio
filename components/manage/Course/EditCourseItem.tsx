import { BiTime } from "react-icons/bi"
import Image from "next/image"
import { Button } from '@/components/ui/button'
import getColorByCourseType from "@/lib/course/getColorByCourseType"
import { Dispatch, useEffect, useState } from "react"
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
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { KeyedMutator } from "swr"
import RingLoader from 'react-spinners/RingLoader'
import { toast } from 'react-hot-toast'
import getToastOption from "@/lib/getToastOption"
import { AiFillDelete } from 'react-icons/ai'
import { GoPerson } from "react-icons/go"

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
  course: Partial<Course>,
  setCourseForm: Dispatch<Course | null>,
  teacherOpt: Teacher[] | undefined,
  mutate: KeyedMutator<Course[]>
}

export default function EditCourseItem({ course, setCourseForm, teacherOpt, mutate }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: course
  })
  const teacher_id = form.watch('teacher_id')
  const type = form.watch('type')
  useEffect(() => {
    if (type === '空中課程') {
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


  const [loading, setLoading] = useState(false)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const res = await fetch('/api/manage/course', {
      method: course.id ? 'PUT' : 'POST',
      body: JSON.stringify(values)
    })
    if (res.ok) {
      mutate()
      toast(course.id ? '修改成功' : '新增成功', getToastOption('light'))
    }
    setLoading(false)
  }

  const handleDeleteCourse = async () => {
    const isConfirm = confirm('確定要刪除該課程嗎？')
    if (!isConfirm) return
    const res = await fetch('/api/manage/course', {
      method: 'DELETE',
      body: JSON.stringify(course.id)
    })
    if (res.ok) {
      toast('刪除成功', getToastOption('light'))
      setCourseForm(null)
      mutate()
    } else {
      toast('刪除失敗', getToastOption('light'))
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 rounded-3xl mb-3 border border-gray-300 shadow-md">
          <div className="flex -mt-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="-mr-2">日期：</FormLabel>
                  <FormControl>
                    <input className="bg-bgColor pl-2 w-[110px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='ml-auto mr-1 mt-2 text-gray-400 h-6 flex'>
              <span className={`cursor-pointer mt-1 mr-1 ${!course.id && 'invisible'}`}
                onClick={handleDeleteCourse}><AiFillDelete /></span >
              <span onClick={() => setCourseForm(null)} className="cursor-pointer">x</span>
            </div >
          </div>
          <div>
            <FormField
              control={form.control}
              name="point"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>點數：</FormLabel>
                  <FormControl>
                    <input type="number" className="bg-bgColor pl-2 w-[50px] text-sm" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <input type="number" className="bg-bgColor w-[50px] text-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <hr className="mb-2" />
          <div className="flex">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      className="font-bold text-lg tracking-wider w-[120px] pl-2 bg-bgColor"
                      placeholder="課程名稱"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem key={Date.now()}>
                  <Select onValueChange={field.onChange} defaultValue={field.value || '空中課程'}>
                    <FormControl>
                      <SelectTrigger className="mt-1 ml-3 text-xs rounded-full w-[90px] h-6 border-none"
                        style={{ backgroundColor: getColorByCourseType(field.value || '空中課程') }}>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-bgColor rounded-2xl">
                      <SelectItem value="空中課程">空中課程</SelectItem>
                      <SelectItem value="地面課程">地面課程</SelectItem>
                      <SelectItem value="兒童課程">兒童課程</SelectItem>
                      <SelectItem value="新開課程">新開課程</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="-mr-2">日期：</FormLabel>
                  <FormControl>
                    <input className="bg-bgColor pl-2 w-[110px] " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className="ml-auto -mr-2">
              {/* <FormField
                control={form.control}
                name="point"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">點數：</FormLabel>
                    <FormControl>
                      <input type="number" className="bg-bgColor pl-2 w-[50px] text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
            {/* <div className='ml-auto -mt-2 mr-1 text-gray-400 h-6 flex'>
              <span className={`cursor-pointer mt-1 mr-1 ${!course.id && 'invisible'}`}
                onClick={handleDeleteCourse}><AiFillDelete /></span >
              <span onClick={() => setCourseForm(null)} className="cursor-pointer">x</span>
            </div > */}
          </div>
          <div className="flex gap-2.5 ml-1 mt-1">
            <BiTime className="mt-1" />
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input className="bg-bgColor w-[60px]"
                      placeholder="開始"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            ~
            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input className="bg-bgColor w-[60px]"
                      placeholder="結束"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="ml-auto mr-[121px]">
              {/* <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">單次價位：</FormLabel>
                    <FormControl>
                      <input type="number" className="bg-bgColor w-[50px] text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
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
                      <SelectContent className="bg-bgColor rounded-2xl">
                        {teacherOpt?.map(opt => (
                          <SelectItem key={opt.id} value={String(opt.id)}>{opt.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            <div className="flex gap-2">
              <div className="flex mt-4 text-xs">
                <span><GoPerson className="text-xs mr-[2px] mt-[1px]" /></span>
                <FormField
                  control={form.control}
                  name="baseline_rez"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input type="number" className="bg-bgColor w-[35px] " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span>/</span>
                <FormField
                  control={form.control}
                  name="total_rez"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input type="number" className="bg-bgColor w-[35px] ml-2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="mt-2 md:w-20 w-15">
                <span className={`${loading && 'hidden'}`}>{course.id ? '修改' : '新增'}</span>
                <RingLoader speedMultiplier={1.5} size={25} color="#FFF" loading={loading} />
              </Button>
            </div>
          </div>
        </form>
      </Form >
    </>
  )
}
