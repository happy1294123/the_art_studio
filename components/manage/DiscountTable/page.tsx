import dynamic from 'next/dynamic'
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { KeyedMutator } from 'swr'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
const NewDiscountDialog = dynamic(() => import('./NewDiscountDialog'))

type Props = {
  discount?: Discount[],
  discountMutate: KeyedMutator<Discount[]>
}

export default function DiscountTable({ discount, discountMutate }: Props) {
  const [openNewDialog, setOpenNewDialog] = useState(false)
  return (<>
    {discount && <>
      <div className="mx-auto bg-bgColorOther rounded-2xl p-3">
        <DataTable columns={columns} data={discount} mutate={discountMutate} />
      </div>
      <Button
        variant='secondary'
        className='float-right mr-3 mt-2'
        onClick={() => setOpenNewDialog(true)}
      >新增折扣碼</Button>
      {openNewDialog && <NewDiscountDialog openProp={openNewDialog} setOpenProp={setOpenNewDialog} discountMutate={discountMutate} />}
    </>}
  </>)
}
