import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

type Props = {
  planOpt: {
    label: string;
    value: string;
  }[],
  setPlanOpt: Dispatch<SetStateAction<{
    label: string;
    value: string;
  }[]>>,
  setDiscountId: Dispatch<SetStateAction<number>>
}

export default function DiscountInput({ planOpt, setPlanOpt, setDiscountId }: Props) {
  useEffect(() => {
    setTimeout(() => {
      document.getElementById('discountCode')?.blur()
    });
    return () => {
      setPlanOpt(planOpt)
    }
  }, [])
  const [isLoading, setIsloading] = useState(false)
  const [desc, setDesc] = useState('')
  const [error, setError] = useState('')
  const [value, setValue] = useState('')
  const handleInputDiscountCode = async (value: string) => {
    setValue(value)
    setError('')
    if (value.length !== 8) return
    setIsloading(true)
    const res = await fetch('/api/course/discount', {
      method: 'POST',
      body: JSON.stringify({
        code: value
      })
    })
    if (res.ok) {
      toast('折扣碼生效', getToastOption())
      const { discount_id, description, point_discount, price_discount } = await res.json()
      setDesc(description)
      setValue(description)
      setDiscountId(discount_id)

      const newOpt = createNewPlanOpt(point_discount, price_discount)
      setPlanOpt(newOpt)
      // console.log(newOpt)
      // console.log(planOpt)
    } else {
      const error = await res.json()
      setError(error)
    }
    setIsloading(false)
  }

  const createNewPlanOpt = (point_discount: string, price_discount: string): { label: string; value: string }[] => {
    let newPlanOpt: { label: string; value: string }[] = []
    planOpt.forEach(opt => {
      if (opt.label.startsWith('點數')) {
        if (point_discount === 'free') {
          newPlanOpt.push({
            label: `點數 0 點(優惠)`,
            value: `0`
          })
          return
        }
        if (point_discount && point_discount !== '0') {
          const newValue = calNewValue(opt.value, point_discount)
          newPlanOpt.push({
            label: `點數 ${newValue} 點(優惠)`,
            value: `${newValue}`
          })
        } else {
          newPlanOpt.push({
            label: `點數 ${opt.value} 點`,
            value: `${opt.value}`
          })
        }
      } else if (opt.label.startsWith('單次')) {
        if (price_discount === 'free') {
          newPlanOpt.push({
            label: `單次 0 元(優惠)`,
            value: `0`
          })
          return
        }
        if (price_discount && price_discount !== '0') {
          const newValue = calNewValue(opt.value, price_discount)
          newPlanOpt.push({
            label: `單次 ${newValue} 元(優惠)`,
            value: `${newValue}`
          })
        } else {
          newPlanOpt.push({
            label: `單次 ${opt.value} 元`,
            value: `${opt.value}`
          })
        }
      }
    })
    if (newPlanOpt[0].value === '0' && newPlanOpt[1].value === '0') {
      newPlanOpt = [{
        label: '免費體驗',
        value: '0'
      }]
    }
    return newPlanOpt
  }

  const calNewValue = (oldValue: string, discount: string) => {
    if (discount.includes('-')) {
      return parseInt(oldValue) + eval(discount)
    } else if (discount.includes('*')) {
      return parseInt(oldValue) * eval(discount.replace('*', ''))
    } else {
      return parseInt(oldValue) - eval(discount)
    }
  }

  const [placeholder, setPlaceholder] = useState('請輸入折扣碼')

  return (
    <div className='my-2 relative'>
      <Input
        id="discountCode"
        placeholder={placeholder}
        className={`rounded-full w-11/12 mx-auto h-9 border-color pl-4 text-center ${isLoading || desc && 'bg-gray-300'}`}
        onChange={e => handleInputDiscountCode(e.target.value)}
        value={value}
        disabled={isLoading || !!desc}
        onFocus={() => setPlaceholder('')}
        onBlur={() => setPlaceholder('請輸入折扣碼')}
      />
      <div className={`absolute right-8 top-3 animate-spin ${isLoading && !desc ? 'block' : 'hidden'}`}>
        <AiOutlineLoading3Quarters />
      </div>
      {/* <span className={`absolute right-8 top-1.5 text-gray-400 ${desc ? 'block' : 'hidden'}`}>
        {desc}
      </span> */}
      {error && <span className='text-red-400 ml-8'>
        {error}
      </span>}
    </div>
  )
}
