import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TeacherSalaryCourse } from "@/type"
import checkIsPass from "@/lib/checkIsPass"
import CourseTypeBadge from "@/components/CourseTypeBadge"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import toast from "react-hot-toast"
import getToastOption from "@/lib/getToastOption"

type Props = {
  data: TeacherSalaryCourse
  formData?: any
  totalPrice?: number,
  switcherData?: {
    monthString: string,
    isPass: boolean
  }
}

export default function SalaryCourseTable({ data, totalPrice, formData, switcherData }: Props) {
  const [payStatus, setPayStatus] = useState<'已結' | '未結' | ''>(() => {
    if (!switcherData?.monthString) return ''
    if (new Date(switcherData.monthString).getTime() > new Date().getTime()) return ''
    if (!data.Salary) return ''
    if (!data.Salary.unPayMonth) return '已結'
    if (data.Salary.unPayMonth && data.Salary.unPayMonth.includes(switcherData.monthString)) {
      return '未結'
    }
    return '已結'
  })

  const calSalary = (studentNum: number, isOpen: boolean | null, baseline_rez: number) => {
    const rule = formData?.rule || data.Salary?.rule
    if (!rule) return
    const solid_price = formData?.solid_price || data.Salary.solid_price
    const dynamic_baseline_price = formData?.dynamic_baseline_price || data.Salary.dynamic_baseline_price
    const dynamic_add_price = formData?.dynamic_add_price || data.Salary.dynamic_add_price

    if (!isOpen) return ''
    if (rule === 'SOLID') return `${solid_price} 元`
    const dynamic_price = parseInt(dynamic_baseline_price) + parseInt(dynamic_add_price) * (studentNum - baseline_rez)
    if (rule === 'DYNAMIC') return `${dynamic_price} 元`
    return ''
  }

  const headingClassName = 'text-center text-headingColor'
  const openCourseNum = data.Course.filter(course => course.isOpen).length

  const handleSwitchChange = async (isCheck: boolean) => {
    setPayStatus(isCheck ? '已結' : '未結')

    const unPayMonth = (() => {
      const unPayMonthAry = formData.unPayMonth?.split(',') || []
      const newAry = unPayMonthAry.filter((month: string) => month !== switcherData?.monthString)
      if (!isCheck) {
        newAry.push(switcherData?.monthString)
      }
      return newAry.join(',')
    })()

    const res = await fetch('/api/manage/salary/unPayMonth', {
      method: 'PUT',
      body: JSON.stringify({
        teacher_id: data.id,
        unPayMonth
      })
    })
    if (!res.ok) {
      toast('更新結款狀態有誤', getToastOption('error'))
    }
  }

  // for teacher
  const getTeacherTotalPrice = () => {
    if (!formData.rule) return 0
    const openCourse = data.Course.filter(c => c.isOpen)
    if (data.Salary.rule === 'SOLID') {
      return openCourse.length * data.Salary.solid_price
    } else if (data.Salary.rule === 'DYNAMIC') {
      let total = 0
      openCourse.forEach(c => {
        total += data.Salary.dynamic_baseline_price
        total += data.Salary.dynamic_add_price * (c.Reservation.length - c.baseline_rez)
      })
      return total
    }
    return 0
  }

  return (<>
    {data.Course.length ? <>
      <div className={`flex ${formData ? 'justify-between' : ' w-fit flex-col ml-auto'} mx-3`}>
        <div className="mt-auto">
          <span className="flex">
            完成課程：
            <span className="ml-auto">
              {openCourseNum} 堂
            </span>
          </span>
          <span className="flex">
            排定課程：
            <span className="ml-auto">
              {data.Course.length} 堂
            </span>
          </span>
        </div>
        <div>
          {/* <span>
            {formData.rule === 'SOLID'
              && <span className="flex">
                固定課費：
                <span className="ml-auto">
                  {formData.solid_price} 元
                </span>
              </span>}
            {formData.rule === 'DYNAMIC'
              && (<>
                <span className="flex">
                  開課底薪：
                  <span className="ml-auto">
                    {formData.dynamic_baseline_price} 元
                  </span>
                </span>
                <span className="flex">
                  課費增幅：
                  <span className="ml-auto">
                    {formData.dynamic_add_price} 元
                  </span>
                </span>
              </>)}
          </span> */}
          {payStatus && (
            <div className="flex items-center justify-end">
              {/* <Label>{new Date(switcherData.monthString).getMonth() + 1}月薪資：{totalPrice} 元</Label> */}
              <Label htmlFor="payStatus" className="text-headingColor mr-4">{payStatus}</Label>
              <Switch
                id="payStatus"
                defaultChecked={payStatus === '已結'}
                onCheckedChange={handleSwitchChange}
                disabled={switcherData?.isPass}
              />
            </div>
          )}
          <span className="flex">
            累積薪資：
            <span className="ml-auto">
              {totalPrice || getTeacherTotalPrice()} 元
            </span>
          </span>
        </div>
      </div>
      <Table className="min-w-[350px]">
        <TableHeader>
          <TableRow className="whitespace-nowrap border-headingColor">
            <TableHead className={headingClassName}>名稱</TableHead>
            <TableHead className={headingClassName}>人數</TableHead>
            <TableHead className={headingClassName}>小計</TableHead>
            <TableHead className={headingClassName}>時間</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.Course.map((course) => {
            const isPass = checkIsPass(`${course.date} ${course.end_time}`)
            return (
              <TableRow key={course.id} className={`whitespace-nowrap border-headingColor ${!isPass && 'opacity-40'}`}>
                <TableCell >
                  <div className="flex-center flex-col">
                    {course.name}
                    <CourseTypeBadge name={course.type as string} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex-center flex-col">
                    {course.Reservation.length} 人
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex-center flex-col">
                    {calSalary(course.Reservation.length, course.isOpen, course.baseline_rez)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex-center flex-col">
                    {course.date}
                    <span>
                      {course.start_time}~{course.end_time}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table >
    </>
      : <span className="flex-center mt-4 mx-auto w-fit">無課程 </span>}
  </>)
}
