"use client"
import { ColumnDef, Row } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FiMoreHorizontal } from 'react-icons/fi'
import { AiFillEdit, AiOutlineUsergroupDelete, AiFillDelete } from 'react-icons/ai'
import toast from "react-hot-toast"
import getToastOption from "@/lib/getToastOption"

const handleShowUsers = (discount_id: number, tableMeta: any) => {
  tableMeta && tableMeta.openUsedList(discount_id)
}

const handleEditDiscount = (row: Row<Discount>, tableMeta: any) => {
  tableMeta && tableMeta.openEditDialog(row.original)
}

const handleDeleteDiscount = async (id: number, tableMeta: any) => {
  const res = await fetch(`/api/manage/discount?id=${id}`, {
    method: 'DELETE'
  })
  if (res.ok) {
    toast('刪除成功', getToastOption())
    tableMeta && tableMeta.updateData()
  } else {
    toast('刪除失敗，請重試', getToastOption())
  }
}

export const columns: ColumnDef<Discount>[] = [
  {
    accessorKey: "code",
    header: "折扣碼",
  },
  {
    accessorKey: "description",
    header: "描述訊息",
  },
  {
    accessorKey: "point_discount",
    header: '點數折扣',
  },
  {
    accessorKey: "price_discount",
    header: '價錢折扣'
  },
  {
    accessorKey: "active",
    header: '啟用狀態',
    cell: ({ row }) => {
      return row.getValue('active') ? '啟用中' : '停用中'
    }
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger onFocus={e => e.target.blur()}><FiMoreHorizontal /></DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleShowUsers(row.original.id, table.options.meta)}
            >
              <AiOutlineUsergroupDelete className="mr-2" />
              使用名單
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleEditDiscount(row, table.options.meta)}
            >
              <AiFillEdit className="mr-2" />
              編輯
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleDeleteDiscount(row.original.id, table.options.meta)}
            >
              <AiFillDelete className="mr-2" />
              刪除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]