"use client"
import { User } from "@prisma/client"
import { ColumnDef, Row } from "@tanstack/react-table"
import { BsFilter } from 'react-icons/bs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import dateFormatter from "@/lib/dateFormatter"

const roleMap = {
  STUDENT: '學生',
  TEACHER: '老師',
  ADMIN: '管理員',
  EDITOR: '小編',
}

const handleSelectFilter = (value: string, tableMeta: any) => {
  for (let key in roleMap) {
    if (roleMap[key as keyof typeof roleMap] === value) {
      tableMeta.filterColumn(key)
      return
    }
  }
  tableMeta.filterColumn('')
}

const roleFilterOptions = ['無', '學生', '老師', '小編', '管理員']

// id               Int @id @default (autoincrement())
//   serial_number    String ?
//   name             String
//   email            String
//   password         String
//   image            String ?
//   role             Role @default (STUDENT)
//   point            Int @default (0)
//   point_deadline   DateTime ?
//   schedule_service String ? @default ("")
//   email_varified   Boolean @default (false)
//   gender           Gender @default (UNKNOW)
//   birth            String ?
//   phone            String ?
//     medical          String ?
//       em_name          String ?
//         em_relation      String ?
//           em_phone         String ?
//             address          String ?
//               note             String ?

export const columns: ColumnDef<Partial<User>>[] = [
  {
    accessorKey: "serial_number",
    header: "編號",
  },
  {
    accessorKey: "name",
    header: "名稱",
  },
  {
    accessorKey: "email",
    header: "電子郵件",
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
  },
  // {
  //   accessorKey: "schedule_service",
  //   header: '行事曆'
  // },
  // {
  //   accessorKey: "email_varified",
  //   header: '信箱驗證',
  //   cell: ({ row }) => {
  //     return row.original.email_varified ? '通過' : '未通過'
  //   }
  // },
  // {
  //   accessorKey: "note",
  //   header: '備註'
  // },
]