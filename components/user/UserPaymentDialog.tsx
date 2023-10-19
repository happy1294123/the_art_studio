import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AiOutlineInfoCircle } from 'react-icons/ai'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Payment } from "@prisma/client"
import { Dispatch, FormEvent, useState } from "react"
import { Input } from "../ui/input"
import LoadingButton from "../LoadingButton"
import { toast } from "react-hot-toast"
import getToastOption from "@/lib/getToastOption"
import { KeyedMutator } from "swr"

type props = {
  open: boolean,
  setOpen: Dispatch<boolean>,
  payment: Payment,
  mutatePayment: KeyedMutator<Payment[]>
}

const stateMap = {
  CHECKING: '資料核對中',
  SUCCESS: '匯款完成',
  ERROR: '匯款有誤',
}

export default function UserPaymentDialog({ open, setOpen, payment, mutatePayment }: props) {
  const [formData, setFormData] = useState({
    paymentId: payment.id,
    date: payment.receive_date,
    price: payment.receive_price,
    account: payment.receive_account,
    note: payment.receive_note,
  })
  const [error, setError] = useState({
    date: '',
    price: '',
    account: '',
    note: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = (field: string, value: string) => {
    setError(prev => ({ ...prev, [field]: '' }))
    setFormData(prev => ({ ...prev, [field]: value }))
    // if (field === 'price' && +value !== payment.price) {
    //   setTimeout(() => {
    //     toast('匯款金額和應付金額不一致', getToastOption())
    //   }, 2000)
    // }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (!formData.date) {
      error.date = '請填寫匯款日期'
      setError(prev => ({ ...prev, date: '請填寫匯款日期' }))
    }
    if (!formData.price) {
      setError(prev => ({ ...prev, price: '請填寫匯款金額' }))
    }
    if (!formData.account || formData.account.length !== 5) {
      setError(prev => ({ ...prev, account: '請填寫您的帳號末5碼' }))
    }
    if (error.date || error.price || error.account || error.note) {
      setIsLoading(false)
      return
    }

    const res = await fetch('/api/user/payment', {
      method: 'POST',
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      mutatePayment()
      console.log(payment);
      toast('送出成功', getToastOption())
    } else {
      toast('送出失敗', getToastOption('error'))
    }

    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">匯款資訊</DialogTitle>
          <ul>
            <li>{payment.course_id ? '課程' : '點數'}：{payment.name}</li>
            <li>銀行：XXXXXX</li>
            <li>帳號：XXXXXX</li>
            <li>金額：NT$ {payment.price}</li>
          </ul>
          <hr />
        </DialogHeader>
        <DialogTitle className="text-xl flex">
          匯款紀錄
          <Popover>
            <PopoverTrigger className="ml-1 text-base outline-none"><AiOutlineInfoCircle /></PopoverTrigger>
            <PopoverContent className="border-headingColor bg-bgColor rounded-3xl shadow-md">請於匯款完成後，填寫以下匯款紀錄，將有專人盡快為您核對資料。</PopoverContent>
          </Popover>
        </DialogTitle>
        <form className="-mt-2 space-y-2" onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              className={`rounded-full h-9 border-gray-400 ${error.date && 'border-primary'}`}
              placeholder="請輸入匯款日期"
              onFocus={e => e.target.type = 'date'}
              onBlur={e => e.target.type = 'text'}
              onChange={e => handleOnChange('date', e.target.value)}
              value={formData.date || ''}
              disabled={payment.state !== 'PENDING'}
            />
            {error.date && <span className="ml-2 text-primary/80">{error.date}</span>}
          </div>
          <div>
            <Input
              type="number"
              className={`rounded-full h-9 border-gray-400 ${error.price && 'border-primary'}`}
              placeholder="請輸入匯款金額"
              onChange={e => handleOnChange('price', e.target.value)}
              value={formData.price || ''}
              disabled={payment.state !== 'PENDING'}
            />
            {error.price && <span className="ml-2 text-primary/80">{error.price}</span>}
          </div>
          <div>
            <Input
              type="text"
              className={`rounded-full h-9 border-gray-400 ${error.account && 'border-primary'}`}
              placeholder="請輸入您的帳號末5碼"
              onChange={e => handleOnChange('account', e.target.value)}
              value={formData.account || ''}
              disabled={payment.state !== 'PENDING'}
            />
            {error.account && <span className="ml-2 text-primary/80">{error.account}</span>}
          </div>
          <div>
            <Input
              type="text"
              className="rounded-full h-9 border-gray-400"
              placeholder="請輸入備註（選填）"
              onChange={e => handleOnChange('note', e.target.value)}
              value={formData.note || ''}
              disabled={payment.state !== 'PENDING'}
            />
          </div>
          <div>
            {payment.state === 'PENDING' && <LoadingButton
              isLoading={isLoading}
              className="mt-1 w-full text-xl h-10"
            >
              確認送出
            </LoadingButton>}
            <span className="flex-center text-gray-400">
              {stateMap[payment.state as keyof typeof stateMap]}
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog >
  )
}