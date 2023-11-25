"use client"
import { User } from "@prisma/client"
import { ColumnDef, Row } from "@tanstack/react-table"
import dateFormatter from "@/lib/dateFormatter"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FiMoreHorizontal } from "react-icons/fi"
import { FaListUl, FaUserAlt } from "react-icons/fa"
import { AiFillEdit } from "react-icons/ai"

const handleShowDetail = (row: any, tableMeta: any) => {
  tableMeta.handleRowAction(row.original, 'detail')
}

const handleShowEdit = (row: any, tableMeta: any) => {
  tableMeta.handleRowAction(row.original, 'edit')
}

const handleShowBuyLog = (row: any, tableMeta: any) => {
  tableMeta.handleRowAction(row.original, 'buyLog')
}

export const columns: ColumnDef<Partial<User>>[] = [
  {
    id: 'actions',
    cell: ({ row, table }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="text-right" onFocus={e => e.target.blur()}><FiMoreHorizontal /></DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleShowDetail(row, table.options.meta)}
            >
              <FaUserAlt className="mr-2" />
              詳細資料
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleShowEdit(row, table.options.meta)}
            >
              <AiFillEdit className="mr-2" />
              編輯資料
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleShowBuyLog(row, table.options.meta)}
            >
              <FaListUl className="mr-2" />
              購買記錄
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
  {
    accessorKey: "serial_number",
    header: "編號",
  },
  {
    accessorKey: "name",
    header: "名稱",
  },
  {
    accessorKey: "point",
    header: '點數',
    cell: ({ row }) => <span>{row.original.point} 點</span>
  },
  {
    accessorKey: "point_deadline",
    header: '點數期限',
    cell: ({ row }) => {
      if (row.original.point_deadline) {
        return <span>{dateFormatter(new Date(row.original.point_deadline))}</span>
      }
    }
  }
]