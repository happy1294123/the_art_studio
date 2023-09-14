'use client'
import DateHeading from '@/components/course/DateHeading'
import CourseItem from '@/components/course/CourseItem'
import TheTitle from '@/components/TheTitle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
import UserDropDownMenu from '@/components/user/UserDropDownMenu'
import useSWR from 'swr'
import { CourseItemSkeleton } from '@/components/course/CoursesShower'
import Link from 'next/link'

async function fetcher(url: string): Promise<Record<string, Reservation[]>> {
  const res = await fetch(url)
  return await res.json()
}

export default function UserPage() {
  const { data: reservations, mutate: mutateReservation } = useSWR(
    '/api/user/course',
    fetcher
  )

  const handleTabsValueChange = (value: string) => {
    // TODO 根據tabs 使用swr獲取資料
    console.log(value)
  }

  return (
    <div className="max-w-screen-md mx-auto">
      {/* 個人頁面  若尚未驗證email則無法顯示頁面 */}
      <div className="flex justify-between -mt-5">
        <TheTitle>個人頁面</TheTitle>
        <div className="flex mt-8">
          <UserDropDownMenu />
        </div>
      </div>
      <Tabs defaultValue="course" onValueChange={handleTabsValueChange}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="course">課表</TabsTrigger>
          <TabsTrigger value="point">點數</TabsTrigger>
          <TabsTrigger value="record">購買記錄</TabsTrigger>
        </TabsList>
        <TabsContent value="course">
          {reservations && Object.keys(reservations).map(date => (
            <>
              <DateHeading date={new Date(date)} />
              {reservations[date as keyof typeof reservations].map((reservation, i) => (
                <CourseItem course={reservation['course']} isInUserPage={true} mutateReservation={mutateReservation} key={i} />
              ))}
            </>
          ))}
          {!reservations && [1, 2, 3].map(i => (
            <CourseItemSkeleton key={i} />
          ))}

          {(reservations && Object.keys(reservations).length === 0)
            && (<><div className="flex-center">目前沒有預約課程</div>
              <div className='flex-center mt-2'>
                <Button className="mx-auto"><Link href="/course">前往預約</Link></Button>
              </div>
            </>)
          }

        </TabsContent >
        <TabsContent value="point">
          點數
          {/* <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, youll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <span>Current password</span>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <span >New password</span>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card> */}
        </TabsContent>
        <TabsContent value="record">
          購買記錄
          {/* <Card>
            <CardHeader>
              <CardTitle>購買記錄</CardTitle>
              <CardDescription>
                Change your password here. After saving, youll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <span>Current password</span>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <span >New password</span>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card> */}
        </TabsContent>
      </Tabs >
      {/* <div onClick={() => signOut()} className="bg-red-400 text-center p-3 mt-3 text-white cursor-pointer">Log Out</div> */}
    </div >
  )
}
