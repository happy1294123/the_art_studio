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
const UserPaymentDialog = dynamic(() => import('@/components/user/UserPaymentDialog'))

type props = {
  payments?: Payment[],
  mutatePayment: KeyedMutator<Payment[]>
}

export default function UserPaymentTabContent({ payments, mutatePayment }: props) {
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
          <CardHeader>
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
                  {payment.state === 'CHECKING'
                    ? <Button variant="ghost" className='w-full max-w-[200px] text-base'>核對中</Button>
                    : <Button className='w-full max-w-[200px] text-base'>立即匯款</Button>}
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
