import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { ChangeEvent, Dispatch, useEffect, useState } from "react"
import toast from "react-hot-toast"
import getToastOption from "@/lib/getToastOption"
import LoadingButton from "@/components/LoadingButton"

type Props = {
  openDialog: boolean,
  setOpenDialog: Dispatch<boolean>
}

export default function UploadStaticScheduleDialog({ openDialog, setOpenDialog }: Props) {
  const [file, setFile] = useState<File>()
  const [preViewSrc, setPreViewSrc] = useState('')

  useEffect(() => {
    if (file) {
      setPreViewSrc(URL.createObjectURL(file))
      return
    }
    (async () => {
      const res = await fetch('/api/manage/staticSchedulePath')
      if (res.ok) {
        const path = await res.json()
        setPreViewSrc(path)
      }
    })()
  }, [file])

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target as HTMLInputElement
    if (!input.files?.length) {
      return
    }
    setFile(input.files[0])
  }

  const [isLoading, setIsLoading] = useState(false)
  const handleUpdateSchedule = async () => {
    if (!file) return
    setIsLoading(true)
    const formData = new FormData()
    formData.set('file', file)
    const res = await fetch('/api/manage/uploadSchedule', {
      method: 'POST',
      body: formData
    })
    if (res.ok) {
      toast('靜態課表更新成功', getToastOption())
      setOpenDialog(false)
    } else {
      toast('靜態課表更新失敗', getToastOption('error'))
    }
    setIsLoading(false)
  }

  return (<>
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>靜態課表</DialogTitle>
          <DialogDescription>
            <div className='flex-center mt-2'>
              <Image src={preViewSrc} width={500} height={600} alt="course_schedule" />
            </div>
            <div>
              <Input className='mt-2 rounded-2xl' type="file" accept="image/*" onChange={handleUploadFile} />
            </div>
            <div>
              <LoadingButton className='mt-2 float-right' onClick={handleUpdateSchedule} isLoading={isLoading}>更新</LoadingButton>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </>
  )
}
