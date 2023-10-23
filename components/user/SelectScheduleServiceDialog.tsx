import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { DiApple } from 'react-icons/di'
import { FaYahoo } from 'react-icons/fa'
import { AiOutlineGoogle } from 'react-icons/ai'
import { BsArrowRightShort } from 'react-icons/bs'
import { PiMicrosoftOutlookLogoFill, PiMicrosoftOutlookLogoLight } from 'react-icons/pi'
import Image from 'next/image'
import { Dispatch, useState } from 'react'
import RingLoader from 'react-spinners/RingLoader'
import { toast } from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import { useSession } from 'next-auth/react'

type Props = {
  openDialog: boolean,
  setOpenDialog: Dispatch<boolean>,
  downloadSchedule?: Function
}

export default function SelectScheduleServiceDialog({ openDialog, setOpenDialog, downloadSchedule }: Props) {
  const { update } = useSession()
  const [isPending, setIsPending] = useState(false)
  const [updateType, setUpdateType] = useState('')

  const handleSetService = async (service: string) => {
    setIsPending(true)
    setUpdateType(service)
    const res = await fetch('/api/user/service', {
      method: 'POST',
      body: JSON.stringify(service)
    })
    if (res.ok) {
      toast('行事曆設定成功', getToastOption())
      update({ schedule_service: service })
      downloadSchedule && downloadSchedule(service)
      setIsPending(false)
      setOpenDialog(false)
    } else {
      const data = await res.json()
      toast(data, getToastOption('error'))
      setIsPending(false)
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-bgColorSecondary border-headingColor drop-shadow-md data-[state=open]:animate-[dialog-content-show_300ms]
                    data-[state=closed]:animate-[dialog-content-hide_300ms]">
        <DialogTitle className="text-2xl font-bold mx-auto">
          請選擇行事曆種類
        </DialogTitle>
        <DialogDescription className="text-2xl">
          <div className="grid md:grid-cols-3 gap-3">
            <Button onClick={() => handleSetService('apple')} className="flex gap-1 text-lg">
              {updateType === 'apple' && isPending ? <RingLoader speedMultiplier={1.5} size={20} color="#FFF" />
                : (<><DiApple />Apple</>)}
            </Button>
            <Button onClick={() => handleSetService('google')} className="flex gap-1 text-lg">
              {updateType === 'google' && isPending ? <RingLoader speedMultiplier={1.5} size={20} color="#FFF" />
                : (<><AiOutlineGoogle />Google</>)}
            </Button>
            <Button onClick={() => handleSetService('outlook')} className="flex gap-1 text-lg">
              {updateType === 'outlook' && isPending ? <RingLoader speedMultiplier={1.5} size={20} color="#FFF" />
                : (<><PiMicrosoftOutlookLogoFill />Outlook</>)}
            </Button>
            <Button onClick={() => handleSetService('outlookcom')} className="flex gap-1 text-lg">
              {updateType === 'outlookcom' && isPending ? <RingLoader speedMultiplier={1.5} size={20} color="#FFF" />
                : (<><PiMicrosoftOutlookLogoLight /><span className="text-sm">outlook.com</span></>)}
            </Button>
            <Button onClick={() => handleSetService('office365')} className="flex gap-1 text-lg">
              {updateType === 'office365' && isPending ? <RingLoader speedMultiplier={1.5} size={20} color="#FFF" />
                : (<><Image src='/icons8-office-365.svg' width={18} height={18} alt='office365' className="" />Office365</>)}
            </Button>
            <Button onClick={() => handleSetService('yahoo')} className="flex gap-1 text-lg">
              {updateType === 'yahoo' && isPending ? <RingLoader speedMultiplier={1.5} size={20} color="#FFF" />
                : (<><FaYahoo />Yahoo</>)}
            </Button>
          </div>
          <span className="text-sm text-center mx-auto text-gray-500 flex justify-center -mb-2 mt-2">日後將套用本次設定</span>
          <div className="text-sm text-center mx-auto text-gray-500 flex justify-center -mb-2 mt-2">
            可至
            <span className="flex mx-1 underline underline-offset-4">個人頁面
              <BsArrowRightShort className="my-auto" />行事曆設定
            </span>
            修改設定
          </div>
        </DialogDescription >
      </DialogContent >
    </Dialog >
  )
}
