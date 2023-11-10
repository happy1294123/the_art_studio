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
import { KeyedMutator } from "swr"
import style from './dataTableStyle.module.scss'
import { Dispatch, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { Input } from "../ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  customClass?: string,
  mutate?: KeyedMutator<any>,
  hasSearch?: boolean,
  setSelectRow?: Dispatch<TData>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  customClass,
  mutate,
  hasSearch,
  setSelectRow
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
      mutate: () => mutate && mutate(),
    }
  })

  return (<>
    {(hasSearch && data.length > 0)
      &&
      <div className="flex w-fit ml-auto justify-end items-center relative ">
        <div className="absolute left-3 text-headingColor">
          <BiSearch />
        </div>
        <Input
          placeholder="搜尋"
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(String(e.target.value))}
          className="w-[150px] md:w-[200px] rounded-full border-headingColor/70 text-headingColor pl-8"
        />
      </div>
    }
    <div className={`rounded-md whitespace-nowrap ${customClass} ${style.myScroller} `}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-headingColor">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="whitespace-nowrap text-headingColor">
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
                className={`border-headingColor ${setSelectRow && 'cursor-pointer'}`}
                onClick={() => setSelectRow && setSelectRow(row.original)}
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
  </>)
}
