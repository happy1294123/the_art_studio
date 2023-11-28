import { columns } from "./columns"
import { DataTable } from "./data-table"
import useSWR from 'swr'
import { ClipLoader } from "react-spinners"

export default function DiscountTable() {
  const { data: receivement, mutate: receiveMutate, isLoading: receivmentLoading } = useSWR('/api/manage/receivement')

  if (receivmentLoading) {
    return (<div className="flex-center">
      <ClipLoader color="#D1C0AD" />
    </div>)
  }

  return (<>
    <div className="mx-auto bg-bgColorOther rounded-2xl p-3">
      <DataTable columns={columns} data={receivement} mutate={receiveMutate} />
    </div>
    {/* : <span className="flex-center">目前沒有款項</span> */}
  </>)
}
