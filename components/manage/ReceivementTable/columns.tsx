"use client"
import { ColumnDef, Row } from "@tanstack/react-table"
import { Payment } from "@prisma/client"
import { Button } from "@/components/ui/button"

const handleReply = (row: Row<Payment>, tableMeta: any) => {
  tableMeta && tableMeta.openReplyDialog(row.original)
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "state",
    header: "",
    cell: ({ row, table }) => {
      const state = row.getValue('state')
      if (state === 'CHECKING') {
        return <div className="flex-center">
          <Button onClick={() => handleReply(row, table.options.meta)}>
            <span className="w-10">
              回覆
            </span>
          </Button>
        </div>
      }

      let text;
      if (state === 'SUCCESS') {
        text = '完成'
      } else if (state === 'PENDING') {
        text = '待匯款'
      } else if (state === 'ERROR') {
        text = '有誤'
      } else if (state === 'CANCEL') {
        text = '取消'
      }
      return <span className="flex-center">{text}</span>
    }
  },
  {
    accessorKey: "receive_account",
    header: () => <div className="whitespace-nowrap">帳號末5碼</div>,
  },
  {
    accessorKey: "receive_price",
    header: '金額',
    cell: ({ row }) => {
      return <span className="whitespace-nowrap">{row.getValue('receive_price')}元</span>
    }
  },
  {
    accessorKey: "receive_date",
    header: () => <div className="w-20">匯款日期</div>,
  },
  {
    accessorKey: "user.name",
    header: '用戶'
  },
  {
    accessorKey: "name",
    header: () => <div className="w-14">項目</div>,
  },
  {
    accessorKey: "receive_note",
    header: () => <div className="whitespace-nowrap">用戶備註</div>,
  }
]