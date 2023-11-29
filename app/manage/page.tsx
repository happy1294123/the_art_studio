'use client'
import TheTitle from "@/components/TheTitle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseSchedule from '@/components/manage/Course/CourseSchedule'
import DiscountTable from '@/components/manage/DiscountTable/page'
import UserDropDownMenu from "@/components/user/UserDropDownMenu"
import ReceivementTable from "@/components/manage/ReceivementTable/page"
import useSWR, { SWRConfig } from "swr"
import { User } from "@prisma/client"
import UsersTable from "@/components/manage/UsersTable/page"
import { useLayoutEffect, useState } from "react"
import { useSession } from "next-auth/react"
import dynamic from "next/dynamic"
import { useRouter, useSearchParams } from "next/navigation"
import { fetcher } from "@/lib/fetcher"
const SalaryTable = dynamic(() => import('@/components/manage/Salary/SalaryTable'))

export default function ManagePage() {
  const { data: session } = useSession()
  const isAdmin = session?.user.role === 'ADMIN'
  const [tab, setTab] = useState<string | null>()
  const params = useSearchParams()
  useLayoutEffect(() => {
    let tab = 'user'
    if (params.get('tab')) {
      tab = params.get('tab') as string
    }
    if (tab === 'salary' && !isAdmin) {
      tab = 'user'
    }
    setTab(tab)
  }, [isAdmin, params])

  const { data: users, mutate: usersMutate, isLoading: userLoading } = useSWR<User[]>('/api/manage/users', fetcher)
  const { data: paymentNum, mutate: paymentNumMutate } = useSWR<number>('/api/manage/receivement/hint', fetcher)

  const router = useRouter()

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* max-w-screen-md */}
      <div className="flex justify-between -mt-5">
        <TheTitle>後台管理</TheTitle>
        <div className="flex mt-8">
          <UserDropDownMenu />
        </div>
      </div>
      <SWRConfig value={{ fetcher }}>
        <Tabs value={tab || 'user'} onValueChange={(value: string) => router.push(`/manage?tab=${value}`)}>
          <TabsList className={`grid grid-cols-${isAdmin ? '5' : '4'}`}>
            <TabsTrigger value="user">會員</TabsTrigger>
            <TabsTrigger value="course">課程</TabsTrigger>
            <TabsTrigger value="discount">折扣</TabsTrigger>
            <TabsTrigger value="receive">
              收款
              {(typeof paymentNum === 'number' && paymentNum !== 0) && <div className='text-xs -mr-5 -mt-5 -ml-1  outline-2 outline-bgColorSecondary bg-primary rounded-full w-4 h-4 text-white'>{paymentNum}</div>}
            </TabsTrigger>
            {isAdmin && <TabsTrigger value="salary">薪資</TabsTrigger>}
          </TabsList>
          {/* 會員 */}
          <TabsContent value="user">
            <UsersTable users={users} usersMutate={usersMutate} userLoading={userLoading} />
          </TabsContent>
          {/* 課程 */}
          <TabsContent value="course">
            <CourseSchedule users={users} />
          </TabsContent >
          {/* 折扣碼 */}
          <TabsContent value="discount">
            <DiscountTable />
          </TabsContent>
          {/* 收款 */}
          < TabsContent value="receive">
            <ReceivementTable paymentNumMutate={paymentNumMutate} />
          </TabsContent>
          {/* 薪資 */}
          {isAdmin && (<TabsContent value="salary">
            <SalaryTable />
          </TabsContent>)}
        </Tabs >
      </SWRConfig>
    </div >
  )
}
