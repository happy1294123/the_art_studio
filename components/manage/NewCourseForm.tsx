"use client"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
const formSchema = z.object({
  name: z.string().max(10, {
    message: '不得大於10個字元'
  }),
  type: z.string(),
  date: z.date(),
  start_time: z.string().length(5, {
    message: '24進制，ex. 23:59'
  }),
  end_time: z.string().length(5, {
    message: '24進制，ex. 23:59'
  }),
  teacher_id: z.string(),
  baseline_rez: z.number(),
  total_rez: z.number(),
  point: z.number(),
  price: z.number(),
})
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

export default function NewCourseForm() {
  const [teacherOpt, setTeacherOpt] = useState([])
  useEffect(() => {
    async function getTeachersAndSet() {
      const res = await fetch('/api/manage/teacher')
      const teachers = await res.json()
      setTeacherOpt(teachers)
    }
    getTeachersAndSet()
  }, [])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseline_rez: 2,
      total_rez: 4,
      point: 10,
      price: 250
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO loading when post
    console.log(values)
    const res = await fetch('/api/manage/course', {
      method: 'POST',
      body: JSON.stringify(values)
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <div className="bg-bgColorOther rounded-3xl p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>課程名稱</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入課程名稱" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>課程種類</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="請選擇" />
                    </SelectTrigger>
                    <SelectContent className="bg-bgColorSecondary rounded-2xl">
                      <SelectItem value="空中課程">空中課程</SelectItem>
                      <SelectItem value="地面課程">地面課程</SelectItem>
                      <SelectItem value="兒童課程">兒童課程</SelectItem>
                      <SelectItem value="新開課程">新開課程</SelectItem>
                    </SelectContent>
                  </Select>
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
                <FormLabel>開課日期</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal h-10"
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'yyyy-MM-dd')
                        ) : (
                          <span>請選擇</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      className="z-30 bg-white"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>開始時間</FormLabel>
                <FormControl>
                  <Input placeholder="ex. 00:00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>結束時間</FormLabel>
                <FormControl>
                  <Input placeholder="ex. 23:59" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teacher_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>上課老師</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="請選擇" />
                    </SelectTrigger>
                    <SelectContent className="bg-bgColorSecondary rounded-2xl">
                      {teacherOpt && teacherOpt.map((opt: { id: number, name: string }) => (
                        <SelectItem key={opt.id} value={String(opt.id)}>{opt.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="baseline_rez"
            render={({ field }) => (
              <FormItem>
                <FormLabel>最低開課人數</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="請輸入最低開課人數" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total_rez"
            render={({ field }) => (
              <FormItem>
                <FormLabel>總人數</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="請輸入總人數" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>點數</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="請輸入點數" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>單次價格</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="請輸入單次價格" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">新增課程</Button>
        </form>
      </Form>
    </div>
  )
}