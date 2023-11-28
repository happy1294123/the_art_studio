import { useSession } from 'next-auth/react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import useSWR, { KeyedMutator } from 'swr'
import Link from 'next/link'
import { BiSolidRightArrow } from 'react-icons/bi'
import { useState } from 'react'
import TheTitle from '../TheTitle'
import dynamic from 'next/dynamic'
import dateFormatter from '@/lib/dateFormatter'
const UserPointDetail = dynamic(() => import('./UserPointDetail'))
import { IoReload } from "react-icons/io5";

const pointOptions = [
  { point: 35, price: 3200 },
  { point: 75, price: 6400 },
  { point: 150, price: 12200 },
  { point: 250, price: 18800 },
]

type props = {
  mutateUnPayNum: KeyedMutator<number>
}

export default function UserPointTabContent({ mutateUnPayNum }: props) {
  const { data: myPoint, mutate: mutatePoint } = useSWR<{ point: number, point_deadline: Date }>('/api/user/point')

  const { data: session, update: updateSession } = useSession()

  if ((myPoint?.point !== session?.user.point) || (myPoint?.point_deadline !== session?.user.point_deadline)) {
    updateSession({
      point: myPoint?.point,
      point_deadline: myPoint?.point_deadline
    })
  }

  const [showBuyPoint, setShowBuyPoint] = useState(true)

  const handleBuyPoint = async (point: number, price: number) => {
    const isComfirm = confirm(`是否要購買${point}點？`)
    if (!isComfirm) return
    const res = await fetch('/api/user/point', {
      method: 'POST',
      body: JSON.stringify({
        point, price
      })
    })
    if (res.ok) {
      // toast('請至匯款紀錄完成匯款', getToastOption())
      const payment_id = await res.json()

      toast(<div className='text-center'>
        <div>購買成功</div>
        <div className='mt-1'>
          <Link href={`/user?tab=payment&id=${payment_id}`}>
            <Button>前往匯款</Button>
          </Link>
        </div>
      </div>, {
        style: {
          borderRadius: '30px',
          backgroundColor: '#FFF5ED',
          color: '#6C370D',
          border: '2px solid #D1C0AD'
        }
      })
      mutateUnPayNum()
    } else {
      toast('購買失敗', getToastOption('error'))
    }
  }

  const pointAlmostExpire = (() => {
    const deadline = new Date(session?.user.point_deadline) as any
    const today = new Date() as any
    const delta = Math.ceil(Math.abs(deadline - today) / (1000 * 60 * 60 * 24))
    return delta <= 10
  })()

  // const [isLoading, setIsLoading] = useState(false)
  // const handleReloadPoint = (e: any) => {
  //   setIsLoading(true)
  //   e.stopPropagation()
  //   mutatePoint()
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 1000);
  // }

  return (<>
    <Card className='mb-4'>
      <CardContent>
        <div className='text-center text-3xl -mb-4 mt-3 flex justify-between cursor-pointer' onClick={() => setShowBuyPoint(!showBuyPoint)}>
          <span className='text-headingColor text-left'>
            剩餘點數
            {/* <span className='flex items-center'>
              <span className='cursor-point -mb-2  ml-1' onClick={mutatePoint}><IoReload fontSize={20} /></span>
            </span> */}
            {session?.user.point_deadline && (<>
              <div className='flex gap-1 mt-1'>
                <p className={`text-base ${pointAlmostExpire && 'text-primary/80'}`}>
                  使用期限：{dateFormatter(new Date(session?.user.point_deadline))}
                </p>
                {/* <span className={`cursor-point mt-0.5 ${isLoading && 'animate-spin'}`} onClick={handleReloadPoint}><IoReload fontSize={18} /></span> */}
              </div>
            </>)
            }
          </span>
          {session && <div className='my-auto md:mr-6 flex'>
            {session.user.point}
            <BiSolidRightArrow className="text-headingColor text-base my-auto ml-2 -mr-4" />
          </div>}
        </div>
      </CardContent>
    </Card>

    {showBuyPoint
      ? <>
        <div className='ml-5 -mb-4'>
          <TheTitle>購買點數</TheTitle>
        </div>
        {pointOptions.map(option => (
          <Card className='md:px-3 mb-2 cursor-pointer' key={option.price} onClick={() => handleBuyPoint(option.point, option.price)}>
            <CardHeader>
              <CardTitle className='md:flex -mb-2'>
                <span>
                  {option.point}點
                </span>
                <span className='mt-auto ml-4 text-base '>NT$ {option.price}</span>
                <Button className='float-right ml-auto -mt-1' >購買點數</Button>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </>
      : <>
        <div className='ml-5 -mb-4'>
          <TheTitle>點數明細</TheTitle>
        </div>
        <UserPointDetail />
      </>}
  </>)
}
