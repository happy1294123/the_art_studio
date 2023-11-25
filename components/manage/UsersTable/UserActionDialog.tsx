import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { User } from "@prisma/client"
import { Dispatch } from "react"
import { KeyedMutator } from "swr"
import UserDetail from './UserDetail'
import UserEdit from "./UserEdit"
import UserBuyLog from "./UserBuyLog"

type Props = {
  rowAction: { action: string, data: User, open: boolean },
  setRowAction: Dispatch<{ action: string, data: User, open: boolean }>,
  userMutate: KeyedMutator<User[]>
}

export default function UserActionDialog({ rowAction, setRowAction, userMutate }: Props) {
  return (
    <Dialog open={rowAction.open} onOpenChange={(open) => setRowAction({ ...rowAction, open })}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            {rowAction.action === 'detail'
              ? '詳細資料'
              : rowAction.action === 'edit'
                ? '編輯資料'
                : '購買記錄'}
          </DialogTitle>
          <DialogDescription>
            {rowAction.data.name}
          </DialogDescription>
        </DialogHeader>
        {rowAction.action === 'detail'
          ? <UserDetail user={rowAction.data} />
          : rowAction.action === 'edit'
            ? <UserEdit user={rowAction.data} setRowAction={setRowAction} userMutate={userMutate} />
            : <UserBuyLog user={rowAction.data} />}
      </DialogContent>
    </Dialog >

  )
}