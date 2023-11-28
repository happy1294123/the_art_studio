'use client'
import TheTitle from '@/components/TheTitle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserDropDownMenu from '@/components/user/UserDropDownMenu'
import useSWR, { SWRConfig } from 'swr'
import UserPointTabContent from '@/components/user/UserPointTabContent'
import { useRouter, useSearchParams } from 'next/navigation'
import UserPaymentTabContent from '@/components/user/UserPaymentTabContent'
import { useLayoutEffect, useState } from 'react'
import LazyTabContent from '@/components/LazyTabContent'
import UserCourseTabContent from '@/components/user/UserCourseTabContent'
import { fetcher } from '@/lib/fetcher'

export default function UserPage() {
  const [tab, setTab] = useState<string | null>()
  const params = useSearchParams()
  useLayoutEffect(() => {
    let tab = 'course'
    if (params.get('tab')) {
      tab = params.get('tab') as string
    }
    setTab(tab)
  }, [params])

  const { data: unPayNum, mutate: mutateUnPayNum } = useSWR<number>(
    '/api/user/payment?unPay=1',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )
  const router = useRouter()

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex justify-between -mt-5">
        <TheTitle>個人頁面</TheTitle>
        <div className="flex mt-8">
          <UserDropDownMenu />
        </div>
      </div>
      <SWRConfig value={{ fetcher }}>
        <Tabs value={tab || 'course'} onValueChange={(value: string) => router.push(`/user?tab=${value}`)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="course">課表</TabsTrigger>
            <TabsTrigger value="point">點數</TabsTrigger>
            <TabsTrigger value="payment">
              匯款記錄
              {(typeof unPayNum === 'number' && unPayNum !== 0) && <div className='text-xs -mr-5 -mt-5 -ml-1  outline-2 outline-bgColorSecondary bg-primary rounded-full w-4 h-4 text-white'>{unPayNum}</div>}
            </TabsTrigger>
          </TabsList>
          {/* course */}
          <TabsContent value="course">
            <LazyTabContent show={tab === 'course'}>
              <UserCourseTabContent />
            </LazyTabContent>
          </TabsContent >
          {/* point */}
          <TabsContent value="point">
            <LazyTabContent show={tab === 'point'}>
              <UserPointTabContent mutateUnPayNum={mutateUnPayNum} />
            </LazyTabContent>
          </TabsContent>
          {/* payment */}
          <TabsContent value="payment">
            <LazyTabContent show={tab === 'payment'}>
              <UserPaymentTabContent mutateUnPayNum={mutateUnPayNum} unPayNum={unPayNum} />
            </LazyTabContent>
          </TabsContent>
        </Tabs >
      </SWRConfig>
    </div >
  )
}
