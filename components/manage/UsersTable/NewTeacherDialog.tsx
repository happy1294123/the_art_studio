import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Dispatch, FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import { KeyedMutator } from "swr"
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"

type Props = {
  openDialog: boolean,
  setOpenDialog: Dispatch<boolean>,
  usersMutate: KeyedMutator<User[]>
}

export default function NewDiscountDialog({ openDialog, setOpenDialog, usersMutate }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  const [error, setError] = useState('')

  const handleNewTeacherAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      setError('請輸入名稱和電子郵件')
      return
    }

    const res = await fetch('/api/manage/teacher', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
      })
    })

    if (res.ok) {
      toast('新增成功', getToastOption('light', 'success'))
      setOpenDialog(false)
      usersMutate()
    } else {
      toast('新增失敗', getToastOption('light', 'error'))
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>新增老師</DialogTitle>
          <DialogDescription className='p-3'>
            <form className="space-y-2" onSubmit={e => handleNewTeacherAccount(e)} >
              <div>
                <Input
                  className="rounded-full"
                  placeholder="請輸入名稱"
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Input
                  type="email"
                  className="rounded-full"
                  placeholder="請輸入電子郵件"
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              {error && <span className="ml-3 text-primary/80">{error}</span>}
              <Button className="w-full text-xl h-10">新增</Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
