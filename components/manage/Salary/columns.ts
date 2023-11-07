"use client"
import { Teacher } from "@/type"
import { ColumnDef } from "@tanstack/react-table"

// 當月 | 總計
// 姓名 鐘點費 人數獎金 匯款方式 匯款資訊 當月堂數 當月薪資 已結\未結

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "name",
    header: "姓名",
  },
  // {
  //   accessorKey: "description",
  //   header: "描述訊息",
  // },
  // {
  //   accessorKey: "point_discount",
  //   header: '點數折扣',
  // },
  // {
  //   accessorKey: "price_discount",
  //   header: '價錢折扣'
  // },
  // {
  //   accessorKey: "active",
  //   header: '啟用狀態',
  //   cell: ({ row }) => {
  //     return row.getValue('active') ? '啟用中' : '停用中'
  //   }
  // },
]