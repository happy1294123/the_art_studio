import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { FiCornerDownLeft } from 'react-icons/fi'
import { Dispatch, useEffect, useMemo, useState } from 'react'
import createRandomCode from '@/lib/createRandomCode'
import { toast } from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import LoadingButton from '@/components/LoadingButton'
import { KeyedMutator } from "swr"
import { Switch } from "@/components/ui/switch"
import { Discount } from "@/type"

type Props = {
  openProp?: boolean,
  setOpenProp?: Dispatch<boolean>,
  discount?: Discount
  discountMutate?: KeyedMutator<Discount[]>
}

export default function NewDiscountDialog({ openProp, setOpenProp, discount, discountMutate }: Props) {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    point_discount: '',
    price_discount: '',
    active: true
  })
  useEffect(() => {
    if (discount) {
      setFormData(discount)
    }
  }, [discount])
  const [error, setError] = useState('')
  const [isLoading, setIsloading] = useState(false)

  const handleSetRandomCode = () => {
    const code = createRandomCode()
    setFormData((prev) => ({ ...prev, code }))
  }

  const method = useMemo(() => discount ? 'PUT' : 'POST', [discount])
  const actionText = useMemo(() => discount ? '編輯' : '新增', [discount])
  const handleAddCode = async () => {
    if (!formData.code || formData.code.length !== 8) {
      setError('請輸入8位元折扣碼')
      return
    }
    if (!formData.description) {
      setError('請輸入描述訊息')
      return
    }
    setIsloading(true)
    const res = await fetch('/api/manage/discount', {
      method, body: JSON.stringify(formData)
    })
    if (res.ok) {
      toast(actionText + '成功', getToastOption())
      setOpenProp && setOpenProp(false)
      discountMutate && discountMutate()
      setFormData({
        code: '',
        description: '',
        point_discount: '',
        price_discount: '',
        active: true
      })
      setError('')
    } else {
      const message = await res.json()
      setError(message)
    }
    setIsloading(false)
  }

  return (
    <Dialog open={openProp} onOpenChange={setOpenProp}>
      {/* <DialogTrigger asChild>
        {children}
      </DialogTrigger> */}
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle className=''>新增折扣碼</DialogTitle>
          <DialogDescription >
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()} className='grid space-y-5'>
          <div>
            <Label htmlFor='code' className='ml-2'>折扣碼</Label>
            <div className='flex'>
              <Input
                id="code"
                className='rounded-2xl h-10 border-gray-400'
                placeholder='請輸入8位元折扣碼'
                value={formData?.code}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, code: e.target.value }))}
                max={8}
              />
              <span
                className="my-auto ml-1 cursor-pointer p-1 text-gray-400"
                onClick={handleSetRandomCode}
                title="隨機生成折扣碼"
              >
                <FiCornerDownLeft />
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor='description' className='ml-2'>描述訊息</Label>
            <Input
              id="description"
              className='rounded-2xl h-10 border-gray-400'
              placeholder='請輸入描述訊息'
              value={formData?.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor='point_discount' className='ml-2'>點數折扣</Label>
            <Input
              id="point_discount"
              className='rounded-2xl h-10 border-gray-400'
              placeholder='請輸入點數折扣'
              value={formData?.point_discount}
              onChange={(e) => setFormData(prev => ({ ...prev, point_discount: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor='price_discount' className='ml-2'>價錢折扣</Label>
            <Input
              id="price_discount"
              className='rounded-2xl h-10 border-gray-400'
              placeholder='請輸入價錢折扣'
              value={formData?.price_discount}
              onChange={(e) => setFormData(prev => ({ ...prev, price_discount: e.target.value }))}
            />
          </div>
          {discount && <div className="ml-3">
            <Label htmlFor="active">啟用狀態</Label>
            <Switch
              id="active"
              className="ml-3"
              checked={formData?.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
          </div>}
          <div>
            {error && <span className='ml-2 text-red-400'>{error}</span>}
            <LoadingButton
              className='w-full text-lg'
              onClick={handleAddCode}
              isLoading={isLoading}
            >
              {actionText}
            </LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
