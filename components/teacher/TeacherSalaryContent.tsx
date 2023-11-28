'use client'
import dateFormatter from "@/lib/dateFormatter"
import { TeacherSalaryCourse } from "@/type"
import { useState } from "react"
import { ClipLoader } from "react-spinners"
import useSWR from "swr"
import SalaryCourseTable from "../manage/Salary/SalaryCourseTable"
import { Input } from "../ui/input"
import { fetcher } from "@/lib/fetcher"

export default function TeacherSalaryContent() {
  const [salaryMonth, setSalaryMonth] = useState(dateFormatter().slice(0, 7))
  const { data: salary, isLoading } = useSWR<TeacherSalaryCourse[]>(
    `/api/manage/salary?month=${salaryMonth}`,
    fetcher
  )

  if (isLoading) return (<div className="flex-center">
    <ClipLoader color="#D1C0AD" />
  </div>)

  if (!salary) return (<div className="flex-center">
    查無薪資資料
  </div>)

  if (!salary[0]?.Salary) return (<div className="flex-center flex-col">
    尚未設定薪資資料
    <div className="text-center">
      請聯絡管理者
    </div >
  </div>)

  const teacherSalaryCourse = salary[0] as TeacherSalaryCourse

  return (
    <div>
      <div className="bg-bgColorOther p-4 rounded-3xl">
        <div className="w-[130px] md:w-[200px] -mb-10">
          <Input
            type='month'
            className="border-headingColor/70 text-headingColor rounded-full"
            value={salaryMonth.replaceAll('/', '-')}
            onChange={e => setSalaryMonth(e.target.value.replaceAll('-', '/'))}
          />
        </div>
        <SalaryCourseTable data={teacherSalaryCourse} />
      </div>
    </div>
  )
}
