'use client'
import TheTitle from "@/components/TheTitle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewCourseForm from '@/components/manage/Course/NewCourseForm'
import DiscountTable from '@/components/manage/DiscountTable/page'
import UserDropDownMenu from "@/components/user/UserDropDownMenu"
import useSWR from "swr"

async function courseFetcher(url: string): Promise<Course[]> {
  const res = await fetch(url, { next: { tags: ['course'] } })
  return await res.json()
}

async function teacherFetcher(url: string): Promise<Teacher[]> {
  const res = await fetch(url)
  return await res.json()
}

async function discountFetcher(url: string): Promise<Discount[]> {
  const res = await fetch(url, { next: { tags: ['discount'] } })
  return await res.json()
}

export default function ManagePage() {
  // course data
  const { data: courses, mutate: coursesMutate } = useSWR(
    `/api/manage/course`,
    courseFetcher
  )

  const { data: teacherOpt } = useSWR(
    'api/manage/teacher',
    teacherFetcher
  )

  // discount data
  const { data: discount, mutate: discountMutate } = useSWR(
    '/api/manage/discount',
    discountFetcher
  )

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex justify-between -mt-5">
        <TheTitle>後台管理</TheTitle>
        <div className="flex mt-8">
          <UserDropDownMenu />
        </div>
      </div>
      <Tabs defaultValue="discount">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="user">會員名單</TabsTrigger>
          <TabsTrigger value="course">課表</TabsTrigger>
          <TabsTrigger value="discount">折扣碼</TabsTrigger>
          {/* <TabsTrigger value="record">購買記錄</TabsTrigger> */}
        </TabsList>
        <TabsContent value="user">
          會員名單管理
        </TabsContent>
        <TabsContent value="course">
          <NewCourseForm courses={courses} coursesMutate={coursesMutate} teacherOpt={teacherOpt} />
        </TabsContent >
        <TabsContent value="discount">
          <DiscountTable discount={discount} discountMutate={discountMutate} />
        </TabsContent>
      </Tabs >
    </div>
  )
}
