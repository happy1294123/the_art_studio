'use client'
import { useRouter } from "next/navigation"
import { useState } from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   SelectGroup,
//   SelectLabel
// } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"


export default function TestReplace() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const goFn = () => {
    router.replace('/')
  }
  return (
    <>
      <div className="flex gap-2">
        <Badge variant="secondary">點數 10 點</Badge>
        <Badge variant="secondary" >
          點數優惠 8 點
        </Badge>
        <Badge variant="outline">單次購買 250元</Badge>
        <Badge variant="secondary">免費體驗</Badge>
      </div>

      {/* <Select>
        <SelectTrigger className="w-[180px] bg-white border-0.5">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}
      {/* {true ? 'not ok '
        :
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when yo done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
      <div onClick={goFn}>TestReplace</div> */}
    </>
  )
}
