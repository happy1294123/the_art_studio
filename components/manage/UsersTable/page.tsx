import { columns } from "./columns"
import { DataTable } from "./data-table"
import { KeyedMutator } from 'swr'
import { Button } from '@/components/ui/button'
import { User } from "@prisma/client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"
const NewTeacherDialog = dynamic(() => import('./NewTeacherDialog'))

type Props = {
  users?: User[],
  usersMutate: KeyedMutator<User[]>
}

export default function UsersTable({ users, usersMutate }: Props) {
  // const [openDialog, setOpenDialog] = useState(false)
  return (<>
    {users && <div className="mx-auto bg-bgColorOther rounded-2xl p-3">
      <DataTable columns={columns} data={users} mutate={usersMutate} />
    </div>}
    {/* <Tabs defaultValue="student">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="student">學生</TabsTrigger>
        <TabsTrigger value="teacher">老師</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        {users && <div className="mx-auto bg-bgColorOther rounded-2xl p-3">
          <DataTable columns={columns} data={users.filter(user => user?.role === 'STUDENT')} mutate={usersMutate} />
        </div>}
      </TabsContent>
      <TabsContent value="teacher">
        {users && <div className="mx-auto bg-bgColorOther rounded-2xl p-3">
          <DataTable columns={columns} data={users.filter(user => user?.role === 'TEACHER')} mutate={usersMutate} />
        </div>}
        <Button
          variant='secondary'
          className='float-right mr-3 my-2'
          onClick={() => setOpenDialog(true)}
        >新增老師
        </Button>
        {openDialog && <NewTeacherDialog openDialog={openDialog} setOpenDialog={setOpenDialog} usersMutate={usersMutate} />}
      </TabsContent >
    </Tabs > */}
  </>)
}
