import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./columns";
import useSWR from "swr";
import { TeacherSalaryCourse } from "@/type";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import SalaryDialog from "./SalaryDialog";
import dateFormatter from "@/lib/dateFormatter";
import { ClipLoader } from "react-spinners";
import React, { useRef } from 'react';

export default function SalaryTable() {
  const [selectRow, setSelectRow] = useState<TeacherSalaryCourse | undefined>()
  const [salaryMonth, setSalaryMonth] = useState(dateFormatter().slice(0, 7))
  const { data: salary, mutate: salaryMutate, isLoading: salaryLoading } = useSWR<TeacherSalaryCourse[]>(`/api/manage/salary?month=${salaryMonth}`)

  if (typeof salary === 'string' && salary === '權限不足') {
    return <div className="flex-center">{salary}</div>
  }

  if (salaryLoading) {
    return (<div className="flex-center">
      <ClipLoader color="#D1C0AD" />
    </div>)
  }

  return (<>
    <div>
      <div className="mx-auto bg-bgColorOther rounded-2xl p-3">
        <div className="w-[130px] md:w-[200px] -mb-10">
          <Input
            type='month'
            required
            className="border-headingColor/70 text-headingColor rounded-full"
            value={salaryMonth.replaceAll('/', '-')}
            max={dateFormatter(new Date(), '-').slice(0, 7)}
            onChange={e => setSalaryMonth(e.target.value.replaceAll('-', '/'))}
          />
        </div>
        {/* {salaryMonth} */}
        {salary?.length && (
          <DataTable
            columns={getColumns(salaryMonth)}
            data={salary}
            hasSearch
            setSelectRow={setSelectRow}
            textCenter
          />
        )}
      </div>
    </div>
    {selectRow && <SalaryDialog data={selectRow} setData={setSelectRow} monthString={salaryMonth} salaryMutate={salaryMutate} />}
  </>)
}
