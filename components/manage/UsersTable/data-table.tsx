"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import { Input } from "@/components/ui/input"
import { BiSearch } from 'react-icons/bi'
import { User } from "@prisma/client"
import UserDetailDialog from "./UserDetailDialog"

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
  const [globalFilter, setGlobalFilter] = useState('')
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    meta: {
      filterColumn: (value: string) => {
        table.getColumn('role')?.setFilterValue(value)
      },
    },
  })

  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const handleClickRow = (row: User) => {
    setSelectedUser(row)
  }

  return (<>
    {data.length > 0 && <div className="flex w-fit ml-auto justify-end items-center relative ">
      <div className="absolute left-3 text-headingColor">
        <BiSearch />
      </div>
      <Input
        placeholder="搜尋"
        value={globalFilter ?? ''}
        onChange={e => setGlobalFilter(String(e.target.value))}
        className="max-w-[200px] rounded-full border-headingColor/70 text-headingColor pl-8"
      />
    </div>}
    <div className={`rounded-md whitespace-nowrap`}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-headingColor">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="whitespace-nowrap">
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
                className="border-headingColor cursor-pointer"
                onClick={() => handleClickRow(row.original as User)}
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
    {selectedUser && <UserDetailDialog selectedUser={selectedUser} setSelectedUser={setSelectedUser} userMutate={mutate} />}
  </>)
}
