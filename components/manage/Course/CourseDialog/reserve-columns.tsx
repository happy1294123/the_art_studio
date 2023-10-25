"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Reservation } from "@prisma/client"
import dateFormatter from "@/lib/dateFormatter"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import getToastOption from "@/lib/getToastOption"

const handleCancel = async (row: Reservation, tableMeta: any) => {
  const isConfirm = confirm('是否要取消預約？')
  if (!isConfirm) return
  let returnPoint = false
  if (row.category === 'POINT' && row.plan_value > 0) {
    returnPoint = confirm(`是否要退還點數${row.plan_value}點？`)
  }
  const toastId = toast('取消中，請稍候', getToastOption('info'))

  const res = await fetch('/api/manage/course/cancelReserve', {
    method: 'POST',
    body: JSON.stringify({
      course_id: row.course_id,
      user_id: row.user_id,
      returnPoint: returnPoint ? row.plan_value : 0,
    })
  })

  if (res.ok) {
    toast('取消預約成功', getToastOption())
    tableMeta.mutate()
  } else {
    toast('取消預約失敗', getToastOption('error'))
  }
  toast.dismiss(toastId)
}

{/* 編號、名稱、預約方式、預約時間、預約狀態、操作 （連結到學生資料） */ }

export const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "user.serial_number",
    header: "編號",
  },
  {
    accessorKey: "user.name",
    header: "名稱",
  },
  {
    accessorKey: "plan_name",
    header: '方案',
  },
  {
    accessorKey: "state",
    header: '狀態',
    cell: ({ row }) => {
      const state = row.getValue('state')
      if (state === 'SUCCESS') {
        return '成功'
      } else if (state === 'PENDING') {
        return '保留中'
      } else if (state === 'CANCEL') {
        return '取消'
      } else {
        return '未知'
      }
    }
  },
  {
    accessorKey: "created_at",
    header: '預約時間',
    cell: ({ row }) => (dateFormatter(new Date(row.getValue('created_at')), '/', true, true))
  },
  {
    accessorKey: 'course_id',
    header: '',
    cell: ({ row, table }) => {
      // TODO 判斷是否已經下課，若已經下課不顯示取消預約
      if (row.getValue('state') === 'CANCEL') return
      return <Button onClick={() => handleCancel(row.original, table.options.meta)}>取消預約</Button>
    }
  }
]