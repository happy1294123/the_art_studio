import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./columns";
import { KeyedMutator } from "swr";
import { Salary } from "@/type";
import { Dispatch, useState } from "react";
import { Input } from "@/components/ui/input";
import SalaryDialog from "./SalaryDialog";

type Props = {
  salary: Salary[],
  salaryMonth: string,
  setSalaryMonth: Dispatch<string>
  // usersMutate: KeyedMutator<User[]>
}

export default function SalaryTable({ salary, salaryMonth, setSalaryMonth }: Props) {
  const [selectRow, setSelectRow] = useState<Salary | undefined>()

  if (typeof salary === 'string' && salary === '權限不足') {
    return <div className="flex-center">{salary}</div>
  }

  return (<>
    <div>
      <div className="mx-auto bg-bgColorOther rounded-2xl p-3">
        <div className="w-[130px] md:w-[200px] -mb-10">
          <Input
            type='month'
            className="border-headingColor/70 text-headingColor rounded-full"
            value={salaryMonth.replaceAll('/', '-')}
            onChange={e => setSalaryMonth(e.target.value.replaceAll('-', '/'))}
          />
        </div>
        {/* {salaryMonth} */}
        {salary.length && (
          <DataTable
            columns={getColumns(salaryMonth)}
            data={salary}
            hasSearch
            setSelectRow={setSelectRow}
          />
        )}
      </div>
    </div>
    {selectRow && <SalaryDialog data={selectRow} setData={setSelectRow} monthString={salaryMonth} />}
  </>)
}
