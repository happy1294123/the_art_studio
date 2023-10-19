import dynamic from 'next/dynamic'
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { KeyedMutator } from 'swr'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Payment } from '@prisma/client'
// const NewDiscountDialog = dynamic(() => import('./NewDiscountDialog'))

type Props = {
  receivement?: Payment[],
  receiveMutate: KeyedMutator<Payment[]>
}

export default function DiscountTable({ receivement, receiveMutate }: Props) {
  // const [openNewDialog, setOpenNewDialog] = useState(false)
  return (<>
    {receivement && <>
      <div className="mx-auto bg-bgColorOther rounded-2xl p-3">
        <DataTable columns={columns} data={receivement} mutate={receiveMutate} />
      </div>
      {/* <Button
        variant='secondary'
        className='float-right mr-3 mt-2'
        onClick={() => setOpenNewDialog(true)}
      >新增折扣碼</Button> */}
      {/* {openNewDialog && <NewDiscountDialog openProp={openNewDialog} setOpenProp={setOpenNewDialog} discountMutate={discountMutate} />} */}
    </>}
  </>)
}
