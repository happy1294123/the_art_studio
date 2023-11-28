"use client"
import { Progress } from "@/components/ui/progress"
import useWindowWidth from "@/lib/useWindowWidth"
import { TeacherSalaryCourse } from "@/type"
import { ColumnDef } from "@tanstack/react-table"

const now = new Date().getTime()

export const getColumns = (monthString: string): ColumnDef<TeacherSalaryCourse>[] => {
  return [
    {
      accessorKey: "name",
      header: "姓名",
    },
    {
      id: 'course',
      header: () => <span className="flex-center">堂數</span>,
      cell: ({ row }) => {
        const total = row.original.Course.length
        let finish = 0
        row.original.Course.forEach(c => {
          const courseDate = new Date(`${c.date} ${c.end_time}`).getTime()
          if (now > courseDate) {
            finish += 1
          }
        });

        // return `${finish} / ${total}`
        return (<>
          <div className='relative hidden md:flex'>
            <div className="absolute flex-center w-full z-10 text-black/60">
              {finish}/{total}
            </div>
            <Progress value={(finish / total) * 100} className='mt-[1px] border border-headingColor' />
          </div>
          <div className="md:hidden">
            {finish}/{total}
          </div>
        </>)
      }
    },
    {
      accessorKey: "",
      header: "薪資",
    },
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
    }
  ]
}
