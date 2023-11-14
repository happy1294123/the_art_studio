import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MyInput } from "@/components/myInput"
import { Label } from "@/components/ui/label"
import { Salary } from "@/type"
import { Dispatch, useState } from "react"
import { Switch } from "@/components/ui/switch"
import LoadingButton from "@/components/LoadingButton"
import { toastResult } from "@/lib/getToastOption"
import DialogSwitcher from "@/components/DialogSwitcher"
import SalaryCourseTable from "./SalaryCourseTable"
import style from '@/components/table/dataTableStyle.module.scss'
import { BiSolidChevronsRight } from "react-icons/bi"

type Props = {
  data: Salary,
  setData: Dispatch<Salary | undefined>,
  monthString: string
}

export default function SalaryDialog({ data, setData, monthString }: Props) {
  const [payStatus, setPayStatus] = useState<'已結' | '未結' | ''>(() => {
    if (!monthString) return ''
    if (new Date(monthString).getTime() > new Date().getTime()) return ''
    if (!data.Salary) return ''
    if (!data.Salary.unPayMonth) return '已結'
    if (data.Salary.unPayMonth && data.Salary.unPayMonth.includes(monthString)) {
      return '未結'
    }
    return '已結'
  })

  const [formData, setFormData] = useState({
    teacher_id: data.id,
    hourly_pay: data.Salary?.hourly_pay,
    bonus: data.Salary?.bonus,
    pay_method: data.Salary?.pay_method,
    pay_account: data.Salary?.pay_account,
    unPayMonth: data.Salary?.unPayMonth
  })

  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async () => {
    setIsLoading(true)
    const hourly_pay = Number(formData.hourly_pay)
    let unPayMonth = formData.unPayMonth
    const unPayMonthAry = unPayMonth.split(',')
    if (payStatus === '已結') {
      const newAry = unPayMonthAry.filter(month => month !== monthString)
      unPayMonth = newAry.join(',')
    } else if (payStatus === '未結' && !unPayMonth.includes(monthString)) {
      unPayMonthAry.push(monthString)
      unPayMonth = unPayMonthAry.join(',')
    }

    const data = { ...formData, hourly_pay, unPayMonth }

    const res = await fetch('/api/manage/salary', {
      method: 'PUT',
      body: JSON.stringify(data)
    })

    toastResult(res, '儲存')

    setIsLoading(false)
  }

  const [isCourseNum, setIsCourseNum] = useState(false)

  return (
    <Dialog open={!!data} onOpenChange={() => setData(undefined)}>
      <DialogContent className={`bg-white ${isCourseNum && 'w-11/12'}`}>
        <DialogHeader>
          <DialogSwitcher label="薪資/課程" status={isCourseNum} setStatus={setIsCourseNum} />
          <DialogTitle className="text-left">
            {isCourseNum ? `${data.name} 課程` : `${data.name} 薪資`}
          </DialogTitle>
          <DialogDescription className="text-left">
            <div>{monthString}</div>
          </DialogDescription>
        </DialogHeader>
        <div className={`overflow-auto max-h-[500px] ${style.myScroller}`}>
          {!isCourseNum
            ? (<form onSubmit={e => e.preventDefault()}>
              <div className="space-y-2">
                <MyInput
                  label="鐘點費"
                  type='number'
                  name="hourly_pay"
                  bind={{ formData, setFormData }}
                />
                <MyInput
                  label="獎金"
                  name="bonus"
                  bind={{ formData, setFormData }}
                />
                <MyInput
                  label="匯款方式"
                  name="pay_method"
                  bind={{ formData, setFormData }}
                />
                <MyInput
                  label="匯款帳號"
                  name="pay_account"
                  bind={{ formData, setFormData }}
                />
                <MyInput
                  label="薪資"
                  placeholder=" "
                  disabled
                />
                {payStatus && (
                  <div className="flex items-center gap-2 ml-2">
                    <Label>結款狀態</Label>
                    <Switch id="payStatus" defaultChecked={payStatus === '已結'} onCheckedChange={(b) => setPayStatus(b ? '已結' : '未結')} />
                    <Label htmlFor="payStatus" className="text-headingColor">{payStatus}</Label>
                  </div>
                )}
              </div>
              <div className="pt-4">
                <LoadingButton
                  isLoading={isLoading}
                  className="w-full text-lg h-10"
                  onClick={handleSubmit}
                >
                  儲存變更
                </LoadingButton>
              </div>
            </form>)
            : (<>
              <SalaryCourseTable data={data} />
              {/* 堂數
              {JSON.stringify(data.Course)} */}
            </>)}
        </div>
        {/* <div className={`-mt-8 ml-auto mr-3 z-10 ${!isCourseNum && 'hidden'}`}>
          <BiSolidChevronsRight color="#B2B2B2" />
        </div> */}
      </DialogContent>
    </Dialog>

  )
}
