'use client'
import TheTitle from "@/components/TheTitle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseSchedule from '@/components/manage/Course/CourseSchedule'
import DiscountTable from '@/components/manage/DiscountTable/page'
import UserDropDownMenu from "@/components/user/UserDropDownMenu"
import ReceivementTable from "@/components/manage/ReceivementTable/page"
import useSWR from "swr"
import { Course, Discount, Teacher } from "@/type"
import { CourseType, Payment, User } from "@prisma/client"
import UsersTable from "@/components/manage/UsersTable/page"
import { useState } from "react"
import { ClipLoader } from "react-spinners"
import { CourseContent } from '@/lib/contexts/ManageCourseContent'
import SalaryTable from "@/components/manage/Salary/SalaryTable"

async function courseFetcher(url: string): Promise<Course[]> {
  const res = await fetch(url, { next: { tags: ['course'] } })
  return await res.json()
}

async function courseTypeFetcher(url: string): Promise<CourseType[]> {
  const res = await fetch(url, { next: { tags: ['courseType'] } })
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

async function receivementFetcher(url: string): Promise<Payment[]> {
  const res = await fetch(url)
  return await res.json()
}

async function usersFetcher(url: string): Promise<User[]> {
  // TODO 後端直接篩選出role === STUDENT 的會員
  const res = await fetch(url)
  return await res.json()
}


export default function ManagePage() {
  const [fetchTrigger, setFetchTrigger] = useState({
    user: true,
    course: false,
    discount: false,
    receive: false
  })

  // users data
  const { data: users, mutate: usersMutate } = useSWR(
    '/api/manage/users',
    usersFetcher
  )

  // course data
  const { data: courses, mutate: coursesMutate } = useSWR(
    fetchTrigger.course && `/api/manage/course`,
    courseFetcher
  )

  const { data: courseType, mutate: courseTypeMutate } = useSWR(
    fetchTrigger.course && '/api/manage/course/type',
    courseTypeFetcher
  )

  const { data: teacherOpt } = useSWR(
    fetchTrigger.course && 'api/manage/teacher',
    teacherFetcher
  )

  // discount data
  const { data: discount, mutate: discountMutate } = useSWR(
    fetchTrigger.discount && '/api/manage/discount',
    discountFetcher
  )

  // receivement data 
  const { data: receivement, mutate: receiveMutate } = useSWR(
    fetchTrigger.receive && '/api/manage/receivement',
    receivementFetcher
  )

  const handleValueChange = (value: string) => {
    setFetchTrigger(prev => ({ ...prev, [value]: true }))
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex justify-between -mt-5">
        <TheTitle>後台管理</TheTitle>
        <div className="flex mt-8">
          <UserDropDownMenu />
        </div>
      </div>
      <Tabs defaultValue="user" onValueChange={handleValueChange}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="user">學員</TabsTrigger>
          <TabsTrigger value="course">課程</TabsTrigger>
          <TabsTrigger value="discount">折扣</TabsTrigger>
          <TabsTrigger value="receive">收款</TabsTrigger>
          <TabsTrigger value="salary">薪資</TabsTrigger>
        </TabsList>
        {/* 學員 */}
        <TabsContent value="user">
          <UsersTable users={users} usersMutate={usersMutate} />
        </TabsContent>
        {/* 課程 */}
        <TabsContent value="course">
          {(courseType && courses)
            ? <CourseContent.Provider value={{
              courses, coursesMutate, courseType, courseTypeMutate, teacherOpt, users
            }}>
              <CourseSchedule />
            </CourseContent.Provider>
            : <div className="flex-center">
              <ClipLoader color="#D1C0AD" />
            </div>}
        </TabsContent >
        {/* 折扣碼 */}
        <TabsContent value="discount">
          <DiscountTable discount={discount} discountMutate={discountMutate} />
        </TabsContent>
        {/* 收款 */}
        <TabsContent value="receive">
          <ReceivementTable receivement={receivement} receiveMutate={receiveMutate} />
        </TabsContent>
        {/* 薪資 */}
        <TabsContent value="salary">
          <SalaryTable users={users} usersMutate={usersMutate} />
          {/* <ReceivementTable receivement={receivement} receiveMutate={receiveMutate} /> */}
        </TabsContent>
      </Tabs >
    </div>
  )
}
