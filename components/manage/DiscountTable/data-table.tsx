"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

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
  </>)
}
