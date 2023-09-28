"use client"
import {
  ColumnDef,
  TableOptionsResolved,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import dynamic from 'next/dynamic'
const EditDiscountDialog = dynamic(() => import('./NewDiscountDialog'))

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  mutate?: any
}

export function DataTable<TData, TValue>({
  columns,
  data,
  mutate
}: DataTableProps<TData, TValue>) {
  const [openDialog, setOpenDialog] = useState(false)
  const [discount, setDiscount] = useState<Discount>()
  const [discountUsers, setDiscountUsers] = useState<{
    name: string,
    email: string
  }[]>()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: () => {
        mutate && mutate()
      },
      openEditDialog: (discount: Discount) => {
        if (discount) {
          setOpenDialog(true)
          setDiscount(discount)
        }
      },
      openUsedList: async (discount_id: string) => {
        if (discount_id) {
          setOpenDialog(true)
          const res = await fetch(`/api/manage/discount/users?discount_id=${discount_id}`)
          const users = await res.json()
          setDiscountUsers(users)
        }
      }
    },
  })

  return (<>
    <div className="rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    {openDialog && discount &&
      <EditDiscountDialog
        openProp={openDialog}
        setOpenProp={setOpenDialog}
        discount={discount}
        discountMutate={mutate}
      />}
    {openDialog && discountUsers &&
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>使用名單</DialogTitle>
            <DialogDescription>
              {discountUsers.length
                ? (<>
                  <div className="grid grid-cols-2 text-center -ml-10">
                    <span>姓名</span>
                    <span>email</span>
                  </div>
                  {discountUsers.map(user => (
                    <div key={user.email} className="grid grid-cols-2 text-center -ml-10">
                      <span>{user.name}</span>
                      <span>{user.email}</span>
                    </div>
                  ))}
                </>)
                : <div className="flex-center">無使用者</div>}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog >
    }
  </>)
}
