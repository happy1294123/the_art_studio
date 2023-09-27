import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoMdArrowDropdownCircle } from 'react-icons/io'
import { LuLogOut } from 'react-icons/lu'
import { BiSolidEdit } from 'react-icons/bi'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { AiOutlineSchedule } from 'react-icons/ai'
import { useState } from "react"
import dynamic from 'next/dynamic'
const SelectScheduleServiceDialog = dynamic(() => import('@/components/SelectScheduleServiceDialog'))

export default function UserDropDownMenu() {
  const { data: session } = useSession()
  const [openSetSkdDialog, setOpenSetSkdDialog] = useState(false)
  return (
    <>
      {session &&
        <DropdownMenu>
          <DropdownMenuTrigger className="h-7 p-1 flex">歡迎回來，{session?.user?.name}<IoMdArrowDropdownCircle className="mt-1 ml-1" /></DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuLabel>
              <div className="cursor-pointer flex"
                onClick={() => setOpenSetSkdDialog(true)}>
                <AiOutlineSchedule className="my-auto mr-1" />行事曆設定</div >
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="cursor-pointer flex"><BiSolidEdit className="my-auto mr-1" />個人資料</div >
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="cursor-pointer flex" onClick={() => signOut()}><LuLogOut className="my-auto mr-1" />登出</div >
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      }
      {openSetSkdDialog && <SelectScheduleServiceDialog openDialog={openSetSkdDialog} setOpenDialog={setOpenSetSkdDialog} />}
    </>
  )
}
