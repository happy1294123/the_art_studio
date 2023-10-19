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

export const columns: ColumnDef<Partial<User>>[] = [
  {
    accessorKey: "name",
    header: "名稱",
  },
  {
    accessorKey: "email",
    header: "電子郵件",
  },
  // {
  //   accessorKey: "role",
  //   header: ({ table }) => {
  //     const filterValue = table.getColumn('role')?.getFilterValue() as keyof typeof roleMap
  //     const cnFilterValue = roleMap[filterValue] ?? '無'

  //     return <DropdownMenu>
  //       <DropdownMenuTrigger className="outline-none"><div className="flex cursor-pointer">角色<BsFilter className="my-auto" /></div></DropdownMenuTrigger>
  //       <DropdownMenuContent>
  //         {roleFilterOptions.map(opt => (
  //           <DropdownMenuItem
  //             key={opt}
  //             className={`${opt === cnFilterValue && 'bg-bgColorSecondary/70'}`}
  //             onClick={() => handleSelectFilter(opt, table.options.meta)}
  //           >
  //             {opt}
  //           </DropdownMenuItem>))}
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   },
  //   cell: ({ row }) => {
  //     const role = row.getValue('role') as keyof typeof roleMap
  //     return <span>{roleMap[role]}</span>
  //   }
  // },
  {
    accessorKey: "point",
    header: '點數'
  },
  {
    accessorKey: "note",
    header: '備註'
  },
]