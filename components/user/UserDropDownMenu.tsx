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
import { RiFileUserLine } from 'react-icons/ri'
import { useState } from "react"
import dynamic from 'next/dynamic'
import { useSearchParams } from "next/navigation"
const SelectScheduleServiceDialog = dynamic(() => import('@/components/user/SelectScheduleServiceDialog'))
const EditPwdDialog = dynamic(() => import('@/components/user/EditPwdDialog'))
const UserInfoDialog = dynamic(() => import('@/components/user/UserInfoDialog'))

export default function UserDropDownMenu() {
  const { data: session } = useSession()
  const params = useSearchParams()
  const [openSetSkdDialog, setOpenSetSkdDialog] = useState(false)
  const [openUserInfo, setOpenUserInfo] = useState(false)
  const [openEditPwd, setOpenEditPwd] = useState(params.get('action') === 'editPwd')

  return (
    <>
      {session &&
        <DropdownMenu>
          <DropdownMenuTrigger className="h-7 p-1 flex outline-none">歡迎回來，{session?.user?.name}<IoMdArrowDropdownCircle className="mt-1 ml-1" /></DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuLabel>
              <div className="cursor-pointer flex"
                onClick={() => setOpenUserInfo(true)}><RiFileUserLine className="my-auto mr-1" />個人資料</div >
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="cursor-pointer flex"
                onClick={() => setOpenEditPwd(true)}><BiSolidEdit className="my-auto mr-1" />修改密碼</div >
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="cursor-pointer flex"
                onClick={() => setOpenSetSkdDialog(true)}>
                <AiOutlineSchedule className="my-auto mr-1" />行事曆設定</div >
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="cursor-pointer flex" onClick={() => signOut()}><LuLogOut className="my-auto mr-1" />登出</div >
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      }
      {openSetSkdDialog && <SelectScheduleServiceDialog openDialog={openSetSkdDialog} setOpenDialog={setOpenSetSkdDialog} />}
      {openEditPwd && <EditPwdDialog openDialog={openEditPwd} setOpenDialog={setOpenEditPwd} />}
      {openUserInfo && <UserInfoDialog openDialog={openUserInfo} setOpenDialog={setOpenUserInfo} />}
    </>
  )
}
