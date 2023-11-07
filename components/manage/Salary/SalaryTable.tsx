import { User } from "@prisma/client"
import { DataTable } from "@/components/table/data-table";
import { columns } from "./columns";
import { KeyedMutator } from "swr";

type Props = {
  users?: User[],
  usersMutate: KeyedMutator<User[]>
}


export default function SalaryTable({ users, usersMutate }: Props) {
  return (
    <div>
      {users && <div className="mx-auto bg-bgColorOther rounded-2xl p-3">
        {/* <DataTable columns={columns} data={users.filter(user => user?.role === 'TEACHER')} mutate={usersMutate} /> */}
      </div>}
    </div>
  )
}
