'use client'
import dateFormatter from "@/lib/dateFormatter"
import { Salary } from "@/type"
import { useState } from "react"
import { ClipLoader } from "react-spinners"
import useSWR from "swr"
import SalaryCourseTable from "../manage/Salary/SalaryCourseTable"
import { Input } from "../ui/input"

async function salaryFetcher(url: string): Promise<Salary[]> {
  const res = await fetch(url)
  return await res.json()
}

export default function TeacherSalaryContent() {
  const [salaryMonth, setSalaryMonth] = useState(dateFormatter().slice(0, 7))
  const { data: salary } = useSWR(
    `/api/manage/salary?month=${salaryMonth}`,
    salaryFetcher
  )

  return (
    <div>
      {(salary && salary?.length > 0)
        ? <div className="bg-bgColorOther p-4 rounded-3xl">
          <div className="w-[130px] md:w-[200px] -mb-10">
            <Input
              type='month'
              className="border-headingColor/70 text-headingColor rounded-full"
              value={salaryMonth.replaceAll('/', '-')}
              onChange={e => setSalaryMonth(e.target.value.replaceAll('-', '/'))}
            />
          </div>
          <SalaryCourseTable data={salary[0] as Salary} />
        </div>
        : <div className="flex-center">
          <ClipLoader color="#D1C0AD" />
        </div>}
    </div>
  )
}
