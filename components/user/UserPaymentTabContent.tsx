'use client'
import { Payment } from '@prisma/client'
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '../ui/button'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { KeyedMutator } from 'swr'
import { useSearchParams } from 'next/navigation'
import { AiOutlineClose } from 'react-icons/ai'
import toast from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
const UserPaymentDialog = dynamic(() => import('@/components/user/UserPaymentDialog'))

type props = {
  payments?: Payment[],
  mutatePayment: KeyedMutator<Payment[]>,
  mutateUnPayNum: KeyedMutator<number>
}

const stateMap = {
  SUCCESS: '完成',
  ERROR: '有誤',
  CHECKING: '核對中',
  CANCEL: '已取消'
}

export default function UserPaymentTabContent({ payments, mutatePayment, mutateUnPayNum }: props) {
  mutateUnPayNum()
  const [open, setOpen] = useState(false)
  const [selectPaymentId, setSelectPaymentId] = useState(0)
  const selectPayment = useMemo(() => payments?.find(p => p.id === selectPaymentId), [payments, selectPaymentId])

  const params = useSearchParams()
  useEffect(() => {
    if (params.get('id')) {
      const initPaymentId = parseInt(params.get('id') as string)
      setSelectPaymentId(initPaymentId)
      setOpen(true)
    }
  }, [params, payments])

  const handleCancelPayment = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, payment: Payment) => {
    e.stopPropagation()
    const isConfirm = confirm('是否要取消購買？')
    if (!isConfirm) return
    const res = await fetch(`/api/user/payment?id=${payment.id}`, {
      method: 'delete'
    })
    if (res.ok) {
      toast('取消購買成功', getToastOption())
      mutatePayment()
      mutateUnPayNum()
    } else {
      toast('取消購買失敗', getToastOption('error'))
    }
  }

  return (<>
    {payments?.length
      ? <>{payments.map(payment => (
        <Card
          className='md:px-3 cursor-pointer mb-3'
          key={payment.id}
          onClick={() => {
            setSelectPaymentId(payment.id)
            setOpen(true)
          }}
        >
          <CardHeader className='relative'>
            {payment.state === 'PENDING' && <div className='absolute right-3 top-3 p-1' onClick={(e) => handleCancelPayment(e, payment)}><AiOutlineClose /></div>}
            <CardTitle className='-mb-2 md:text-left text-center'>
              <div>
                {payment.name}
                <span className='mt-auto ml-4 text-base'>NT$ {payment.price}</span>
              </div>
              <div className="md:flex justify-between">
                <div className='mt-2'>
                  <span className='text-base'>{payment.description}</span>
                </div>
                <div className='md:mt-0 mt-2'>
                  {payment.state === 'PENDING'
                    ? <Button className='w-full max-w-[200px] text-base'>立即匯款</Button>
                    : <Button variant="ghost" className='w-full max-w-[200px] text-base'>
                      {stateMap[payment.state]}
                    </Button>}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>))
      }</>
      : <span className='flex-center'>無匯款紀錄</span>}

    {open && selectPayment && <UserPaymentDialog open={open} setOpen={setOpen} payment={selectPayment} mutatePayment={mutatePayment} />}
  </>
  )
}
