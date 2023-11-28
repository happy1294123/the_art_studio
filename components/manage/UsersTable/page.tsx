import { columns } from "./columns"
import { DataTable } from "@/components/table/data-table"
import { KeyedMutator } from 'swr'
import { Button } from '@/components/ui/button'
import { User } from "@prisma/client"
import { useState } from "react"
import dynamic from "next/dynamic"
import UserActionDialog from "./UserActionDialog"
import { ClipLoader } from "react-spinners"
const NewTeacherDialog = dynamic(() => import('./NewTeacherDialog'))

type Props = {
  users?: User[],
  usersMutate?: KeyedMutator<User[]>
  userLoading?: boolean
}

export default function UsersTable({ users, usersMutate, userLoading }: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const [rowAction, setRowAction] = useState<{ action: string, data: User, open: boolean }>()
  const handleRowAction = (data: User, action: 'detail' | 'edit' | 'buyLog') => {
    setRowAction({ data, action, open: true })
  }

  if (userLoading) {
    return (<div className="flex-center">
      <ClipLoader color="#D1C0AD" />
    </div>)
  }

  if (!users || !usersMutate) {
    return null
  }

  return (<>
    <div className="mx-auto bg-bgColorOther rounded-2xl p-3">
      <DataTable
        columns={columns}
        data={users}
        mutate={usersMutate}
        hasSearch
        handleRowAction={handleRowAction}
      />
    </div >
    {rowAction && <UserActionDialog
      rowAction={rowAction}
      setRowAction={setRowAction}
      userMutate={usersMutate} />
    }
    <div className="-mr-3">
      <Button
        variant='secondary'
        className='float-right mr-3 my-2'
        onClick={() => setOpenDialog(true)}
      >新增老師
      </Button>
      {openDialog && <NewTeacherDialog openDialog={openDialog} setOpenDialog={setOpenDialog} usersMutate={usersMutate} />}
    </div>
  </>)
}
