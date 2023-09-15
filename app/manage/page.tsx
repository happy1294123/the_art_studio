'use client'
import TheTitle from "@/components/TheTitle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewCourseForm from '@/components/manage/NewCourseForm'
import UserDropDownMenu from "@/components/user/UserDropDownMenu"

export default function ManagePage() {
  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex justify-between -mt-5">
        <TheTitle>後台管理</TheTitle>
        <div className="flex mt-8">
          <UserDropDownMenu />
        </div>
      </div>
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
    </div>
  )
}
