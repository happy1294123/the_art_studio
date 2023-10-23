import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Dispatch, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import toast from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import LoadingButton from '../LoadingButton'
import { useRouter } from "next/navigation"

type Props = {
  openDialog: boolean,
  setOpenDialog: Dispatch<boolean>,
  downloadSchedule?: Function
}

export default function SelectScheduleServiceDialog({ openDialog, setOpenDialog, downloadSchedule }: Props) {
  const [isPending, setIsPending] = useState(false)
  const [formData, setFormData] = useState({
    oldPwd: '',
    newPwd: '',
    confirmNewPwd: ''
  })
  const [error, setError] = useState('')

  const handleSetValue = (field: string, value: string) => {
    error && setError('')
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const router = useRouter()
  const handleEditPwd = async () => {
    if (!formData.oldPwd || !formData.newPwd || !formData.confirmNewPwd) {
      setError('請填寫舊密碼和新密碼')
      return
    }
    if (formData.newPwd !== formData.confirmNewPwd) {
      setError('新密碼不一致')
      return
    }
    if (formData.newPwd.length < 6) {
      setError('密碼小於6個字元')
    }
    setIsPending(true)
    const res = await fetch('/api/user/editPwd', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    if (res.ok) {
      toast('修改密碼成功', getToastOption())
      setOpenDialog(false)
      router.push('/user')
    } else {
      const error = await res.json()
      setError(error)
    }
    setIsPending(false)
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-bgColorSecondary border-headingColor drop-shadow-md data-[state=open]:animate-[dialog-content-show_300ms]
                    data-[state=closed]:animate-[dialog-content-hide_300ms]">
        <DialogTitle className="text-2xl font-bold mx-auto">
          修改密碼
        </DialogTitle>
        <DialogDescription className="text-2xl">
          <form className="grid gap-2 text-fontColor/70" onSubmit={e => e.preventDefault()}>
            <div>
              <Label htmlFor='oldPwd' className='ml-3'>舊密碼</Label>
              <Input
                id="oldPwd"
                type='password'
                className='rounded-full'
                value={formData.oldPwd}
                onChange={e => handleSetValue('oldPwd', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor='newPwd' className='ml-3'>新密碼</Label>
              <Input
                id="newPwd"
                type='password'
                className='rounded-full'
                value={formData.newPwd}
                onChange={e => handleSetValue('newPwd', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor='confirmNewPwd' className='ml-3'>確認新密碼</Label>
              <Input
                id="confirmNewPwd"
                type='password'
                className='rounded-full'
                value={formData.confirmNewPwd}
                onChange={e => handleSetValue('confirmNewPwd', e.target.value)}
              />
            </div>
            {error && <span
              className='text-[14px] ml-3 -mb-6 text-primary/80'>{error}
            </span>}
            <LoadingButton
              className='text-2xl h-10 mt-3 w-full'
              onClick={handleEditPwd}
              isLoading={isPending}
            >修改密碼
            </LoadingButton>
          </form>
        </DialogDescription >
      </DialogContent >
    </Dialog >
  )
}
