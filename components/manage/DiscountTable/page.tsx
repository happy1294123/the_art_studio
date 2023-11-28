import dynamic from 'next/dynamic'
import { columns } from "./columns"
import { DataTable } from "./data-table"
import useSWR from 'swr'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
const NewDiscountDialog = dynamic(() => import('./NewDiscountDialog'))

export default function DiscountTable() {
  const { data: discount, mutate: discountMutate, isLoading: discountLoading } = useSWR('/api/manage/discount')
  const [openNewDialog, setOpenNewDialog] = useState(false)

  if (discountLoading) {
    return (<div className="flex-center">
      <ClipLoader color="#D1C0AD" />
    </div>)
  }

  return (<>
    <div className="mx-auto bg-bgColorOther rounded-2xl p-3">
      <DataTable columns={columns} data={discount} mutate={discountMutate} />
    </div>
    <Button
      variant='secondary'
      className='float-right mr-3 mt-2'
      onClick={() => setOpenNewDialog(true)}
    >新增折扣碼</Button>
    {openNewDialog && <NewDiscountDialog openProp={openNewDialog} setOpenProp={setOpenNewDialog} discountMutate={discountMutate} />}
  </>)
}
