'use client'
import TheTitle from "@/components/TheTitle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewCourseForm from '@/components/manage/NewCourseForm'

export default function ManagePage() {
  return (
    <>
      <TheTitle>後台管理</TheTitle>
      <Tabs defaultValue="course">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="course">新增課表</TabsTrigger>
          <TabsTrigger value="user">會員名單</TabsTrigger>
          {/* <TabsTrigger value="record">購買記錄</TabsTrigger> */}
        </TabsList>
        <TabsContent value="course">
          <NewCourseForm />
        </TabsContent >
        <TabsContent value="user">
          會員名單管理
        </TabsContent>
      </Tabs >
    </>
  )
}
