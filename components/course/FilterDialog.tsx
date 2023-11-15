import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MyCourseFilter } from "@/type"
import { Dispatch, SetStateAction, useState, } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import useSWR from "swr"

type Props = {
  filter: MyCourseFilter,
  setFilter: Dispatch<SetStateAction<MyCourseFilter>>,
}

type Option = {
  value: string,
  label: string
}

async function fetcher(url: string) {
  const res = await fetch(url)
  return res.json()
}

export default function FilterDialog({ filter, setFilter }: Props) {
  const random = Math.random()

  const { data: options } = useSWR(
    filter.column === 'courseType' ? '/api/course/typeOpts' : '/api/course/teacherOpts',
    fetcher
  )

  return (
    <Dialog open={filter.isShow} onOpenChange={(isShow: boolean) => setFilter({ ...filter, isShow })}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>篩選器</DialogTitle>
        </DialogHeader>
        <div>
          <RadioGroup
            className="flex"
            key={random}
            onValueChange={(value: 'courseType' | 'teacherName') => setFilter({ ...filter, column: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="courseType" id="courseType" checked={filter.column === 'courseType'} className="radioRef" />
              <Label htmlFor="courseType">課程種類</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="teacherName" id="teacherName" checked={filter.column === 'teacherName'} className="radioRef" />
              <Label htmlFor="teacherName">老師名稱</Label>
            </div>
          </RadioGroup>

          {filter.column.length > 0 && (
            <Select onValueChange={value => setFilter({ ...filter, value })}>
              <SelectTrigger className="w-[180px] mt-3 rounded-full border-gray-400 ">
                <SelectValue placeholder="請選擇" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl shadow-xl" >
                {options?.map((opt: Option) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <div className="flex justify-end">
            <Button
              variant="link"
              className={`ml-auto invisible ${filter.column && 'visible'}`}
              onClick={() => setFilter({ isShow: true, value: '', column: '' })}
            >
              清除
            </Button>
            <Button className="" onClick={() => console.log(filter)}>查詢</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog >
  )
}
