import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MyInput } from "@/components/myInput"
import { Label } from "@/components/ui/label"
import { Dispatch, useMemo, useState } from "react"
import LoadingButton from "@/components/LoadingButton"
import { toastResult } from "@/lib/getToastOption"
import DialogSwitcher from "@/components/DialogSwitcher"
import SalaryCourseTable from "./SalaryCourseTable"
import style from '@/components/table/dataTableStyle.module.scss'
import { KeyedMutator } from "swr"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TeacherSalaryCourse } from "@/type"
import dateFormatter from "@/lib/dateFormatter"

type Props = {
  data: TeacherSalaryCourse,
  setData: Dispatch<TeacherSalaryCourse | undefined>,
  monthString: string,
  salaryMutate: KeyedMutator<TeacherSalaryCourse[]>
}

export default function SalaryDialog({ data, setData, monthString, salaryMutate }: Props) {
  const isPass = monthString !== dateFormatter().slice(0, 7)

  const [formData, setFormData] = useState({
    teacher_id: data.id,
    pay_method: data.Salary?.pay_method,
    pay_account: data.Salary?.pay_account,
    rule: data.Salary?.rule || '',
    solid_price: String(data.Salary?.solid_price || 0),
    dynamic_baseline_price: String(data.Salary?.dynamic_baseline_price || 0),
    dynamic_add_price: String(data.Salary?.dynamic_add_price || 0),
    // unPayMonth: data.Salary?.unPayMonth || monthString,
  })

  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async () => {
    if (isPass) return
    setIsLoading(true)

    const res = await fetch('/api/manage/salary', {
      method: 'PUT',
      body: JSON.stringify(formData)
    })

    toastResult(res, '儲存', salaryMutate)

    const newSalary = await res.json()
    setData({ ...data, Salary: newSalary })

    setIsLoading(false)
  }

  const calDynamicSalary = (studentNum: number) => {
    const addSalary = parseInt(formData.dynamic_add_price) * studentNum
    return parseInt(formData.dynamic_baseline_price) + addSalary
  }

  const totalPrice = useMemo(() => {
    if (!formData.rule) return 0
    if (formData.rule === 'SOLID') {
      const openCourseNum = data.Course.filter(c => c.isOpen).length
      return openCourseNum * parseInt(formData.solid_price)
    }
    if (formData.rule === 'DYNAMIC') {
      let total = 0
      data.Course.forEach(course => {
        if (course.isOpen) {
          total += parseInt(formData.dynamic_baseline_price)
          total += parseInt(formData.dynamic_add_price) * (course.Reservation.length - course.baseline_rez)
        }
      })
      return total
    }
  }, [data.Course, formData.dynamic_add_price, formData.dynamic_baseline_price, formData.rule, formData.solid_price])

  const [isEditSalary, setIsEditSalary] = useState(false)

  return (
    <Dialog open={!!data} onOpenChange={() => setData(undefined)}>
      <DialogContent className={`bg-white ${isEditSalary && 'w-11/12'}`}>
        <DialogHeader>
          <DialogSwitcher label="課程/薪資" status={isEditSalary} setStatus={setIsEditSalary} />
          <DialogTitle className="text-left">
            {data.name} {isEditSalary ? `薪資` : `課程`}
          </DialogTitle>
          <DialogDescription className="text-left">
            <div>{monthString}</div>
          </DialogDescription>
        </DialogHeader>
        <div className={`overflow-auto max-h-[500px] ${style.myScroller}`}>
          {!isEditSalary
            ? <SalaryCourseTable
              data={data}
              formData={formData}
              totalPrice={totalPrice}
              switcherData={{ monthString, isPass }}
            />
            : (<form onSubmit={e => e.preventDefault()}>
              <div className="space-y-2">
                <MyInput
                  label="匯款方式"
                  name="pay_method"
                  bind={{ formData, setFormData }}
                  disabled={isPass}
                />
                <MyInput
                  label="匯款帳號"
                  name="pay_account"
                  bind={{ formData, setFormData }}
                  disabled={isPass}
                />
                <div>
                  <Label className="ml-2">課費計算</Label>
                  <Select
                    value={formData.rule || ''}
                    onValueChange={value => setFormData({ ...formData, rule: value || '' })}
                    disabled={isPass}
                  >
                    <SelectTrigger className="w-full rounded-full border-gray-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-2xl">
                      <SelectItem value="SOLID">固定型</SelectItem>
                      <SelectItem value="DYNAMIC">動態型</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.rule === 'SOLID' && (
                  <MyInput
                    label="固定課費"
                    name="solid_price"
                    type="number"
                    bind={{ formData, setFormData }}
                    desc={`$${formData.solid_price}/堂，不限人數`}
                    disabled={isPass}
                  />
                )}
                {formData.rule === 'DYNAMIC' && (
                  <MyInput
                    label="開課底薪"
                    name="dynamic_baseline_price"
                    type="number"
                    bind={{ formData, setFormData }}
                    desc={`$${formData.dynamic_baseline_price}/2人`}
                    disabled={isPass}
                  />
                )}
                {formData.rule === 'DYNAMIC' && (
                  <MyInput
                    label="課費增幅"
                    name="dynamic_add_price"
                    type="number"
                    bind={{ formData, setFormData }}
                    desc={`
                    $${calDynamicSalary(1)}/3人,
                    $${calDynamicSalary(2)}/4人,
                    $${calDynamicSalary(3)}/5人,
                    `}
                    disabled={isPass}
                  />
                )}
              </div>
              <div className={`pt-4 ${isPass && 'hidden'}`}>
                <LoadingButton
                  isLoading={isLoading}
                  className="w-full text-lg h-10"
                  onClick={handleSubmit}
                >
                  儲存變更
                </LoadingButton>
              </div>
            </form>)}
        </div>
      </DialogContent>
    </Dialog>

  )
}
