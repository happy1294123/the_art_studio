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
import { KeyedMutator } from 'swr'
import { Payment } from '@prisma/client'
import Link from 'next/link'

const pointOptions = [
  { point: 35, price: 3200 },
  { point: 75, price: 6400 },
  { point: 150, price: 12200 },
  { point: 250, price: 18800 },
]

type props = {
  myPoint?: number,
  mutateUnPayNum: KeyedMutator<number>
}

export default function UserPointTabContent({ myPoint, mutateUnPayNum }: props) {
  const { data: session, update: updateSession } = useSession()
  if (myPoint) {
    updateSession({ point: myPoint })
  }
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

  return (<>
    <Card className='mb-4'>
      <CardContent>
        <div className='text-center text-3xl -mb-4 mt-3'>
          <span className='text-headingColor'>
            剩餘點數
          </span>
          {session && <div>
            {session.user.point}
          </div>}
        </div>
      </CardContent>
    </Card>

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

  </>)
}
