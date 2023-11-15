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
import { Button } from "../ui/button"
import useSWR from "swr"
import { useReserveContent } from "@/context/ReserveContent"

type Option = {
  value: string,
  label: string
}

async function fetcher(url: string) {
  const res = await fetch(url)
  return res.json()
}

export default function FilterDialog() {
  const { filter, setFilter } = useReserveContent()
  const random = Math.random()

  const { data: options } = useSWR(
    filter.column === 'courseType' ? '/api/course/typeOpts' : '/api/course/teacherOpts',
    fetcher
  )

  const selectOnValueChange = (value: string) => {
    const showText = filter.column === 'courseType' ? value : options.find((opt: Option) => opt.value === value).label

    const newFilter = {
      column: filter.column,
      value,
      showText,
      isShow: false
    }
    setFilter(newFilter)
  }

  return (
    <Dialog open={filter.isShow} onOpenChange={(isShow: boolean) => setFilter({ ...filter, isShow })}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>篩選器</DialogTitle>
        </DialogHeader>

        <div className="">
          <RadioGroup
            className="flex justify-center gap-8"
            key={random}
            onValueChange={(value: 'courseType' | 'teacherName') => setFilter({ ...filter, column: value, value: '' })}
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
            <Select onValueChange={selectOnValueChange} defaultValue={filter.value}>
              <SelectTrigger className="max-w-[330px] mx-auto my-3 rounded-full border-gray-400 ">
                <SelectValue placeholder="請選擇" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-xl shadow-xl" >
                {options?.map((opt: Option) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            variant="link"
            className={`flex ml-auto invisible ${filter.column && 'visible'}`}
            onClick={() => setFilter({ isShow: true, value: '', column: '', showText: '' })}
          >
            清除
          </Button>
        </div>
      </DialogContent>
    </Dialog >
  )
}
