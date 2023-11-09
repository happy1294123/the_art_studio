import { columns } from "./columns"
import { DataTable } from "./data-table"
import { KeyedMutator } from 'swr'
import { Payment } from '@prisma/client'

type Props = {
  receivement: Payment[],
  receiveMutate: KeyedMutator<Payment[]>
}

export default function DiscountTable({ receivement, receiveMutate }: Props) {
  if (typeof receivement === 'string' && receivement === '權限不足') {
    return <div className="flex-center">權限不足</div>
  }


  return (<>
    <div className="mx-auto bg-bgColorOther rounded-2xl p-3">
      <DataTable columns={columns} data={receivement} mutate={receiveMutate} />
    </div>
    {/* : <span className="flex-center">目前沒有款項</span> */}
  </>)
}
