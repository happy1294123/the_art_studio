import TheTitle from '@/components/TheTitle'
import UserDropDownMenu from '@/components/user/UserDropDownMenu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TeacherCourseContent from '@/components/teacher/TeacherCourseContent'
import TeacherSalaryContent from '@/components/teacher/TeacherSalaryContent'

export default function TeacherPage() {
  return (
    <div className='max-w-screen-md mx-auto'>
      <div className="flex justify-between -mt-5">
        <TheTitle>老師專區</TheTitle>
        <div className="flex mt-8">
          <UserDropDownMenu />
        </div>
      </div>
      <Tabs defaultValue="course">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="course">課程</TabsTrigger>
          <TabsTrigger value="salary">薪資</TabsTrigger>
        </TabsList>
        {/* 課程 */}
        <TabsContent value="course">
          <TeacherCourseContent />
        </TabsContent >
        {/* 薪資 */}
        <TabsContent value="salary">
          <TeacherSalaryContent />
        </TabsContent>
      </Tabs >
    </div>
  )
}
