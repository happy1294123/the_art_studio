"use client"
import { Salary } from "@/type"
import { ColumnDef } from "@tanstack/react-table"

// 當月 | 總計
// 姓名 鐘點費 人數獎金 匯款方式 匯款資訊 當月堂數 當月薪資 已結\未結
const now = new Date().getTime()

export const getColumns = (monthString: string): ColumnDef<Salary>[] => {
  return [
    {
      accessorKey: "name",
      header: "姓名",
    },
    {
      accessorKey: "",
      header: "完成堂數",
      cell: ({ row }) => {
        const total = row.original.Course.length
        let finish = 0
        row.original.Course.forEach(c => {
          const courseDate = new Date(`${c.date} ${c.end_time}`).getTime()
          if (now > courseDate) {
            finish += 1
          }
        });
        return `${finish} / ${total}`
      }
    },
    {
      accessorKey: "",
      header: "當月堂數",
      cell: ({ row }) => {
        const total = row.original.Course.length
        let finish = 0
        row.original.Course.forEach(c => {
          const courseDate = new Date(`${c.date} ${c.end_time}`).getTime()
          if (now > courseDate) {
            finish += 1
          }
        });
        return `${finish} / ${total}`
      }
    },
    {
      accessorKey: "",
      header: "薪資",
    },
    // {
    //   accessorKey: "pay_method",
    //   header: "付款方式",
    // },
    // {
    //   accessorKey: "pay_account",
    //   header: "付款帳號",
    // },
    {
      accessorKey: "unPayMonth",
      header: "結款狀態",
      cell: ({ row }) => {
        if (!monthString) return ''
        if (new Date(monthString).getTime() > now) return ''
        if (!row.original.Salary) return ''
        if (!row.original.Salary.unPayMonth) return '已結'
        if (row.original.Salary.unPayMonth && row.original.Salary.unPayMonth.includes(monthString)) {
          return '未結'
        }
        return '已結'
      }
    },
    // {
    //   accessorKey: "hourly_pay",
    //   header: "鐘點費",
    // },
    // {
    //   accessorKey: "bonus",
    //   header: "獎金計算",
    // },
  ]
}
