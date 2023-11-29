import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChangeEvent, Dispatch, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import toast from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import LoadingButton from '../LoadingButton'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "../ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import style from '@/components/table/dataTableStyle.module.scss'

type Props = {
  openDialog: boolean,
  setOpenDialog: Dispatch<boolean>,
  updateSession: any,
  userSession: any
}

export default function SelectScheduleServiceDialog({ openDialog, setOpenDialog, updateSession, userSession }: Props) {
  const [isPending, setIsPending] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    birth: '',
    image: '',
    phone: '',
    address: '',
    gender: '',
    medical: '',
    em_name: '',
    em_relation: '',
    em_phone: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchSetUserInfo() {
      const res = await fetch('/api/user/info')
      const data = await res.json()
      setFormData(data)
      if (data.image) {
        setPreViewSrc(data.image)
      }
    }
    fetchSetUserInfo()
  }, [])

  const [file, setFile] = useState<File>()
  const [preViewSrc, setPreViewSrc] = useState('/avatar/default_avatar.jpeg')
  useEffect(() => {
    if (file) {
      setPreViewSrc(URL.createObjectURL(file))
    }
  }, [file])

  const handleSetValue = (field: string, value: string) => {
    error && setError('')
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTriggerFileInput = () => {
    const input = document.getElementById('file-input') as HTMLInputElement
    input.click()
  }

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target as HTMLInputElement
    if (!input.files?.length) {
      return
    }
    setFile(input.files[0])
  }

  const handleUpdateInfo = async () => {
    setIsPending(true)
    let image = ''

    if (file) {
      const formData = new FormData()
      formData.set('file', file)
      const fileUploadRes = await fetch('/api/user/info', {
        method: 'POST',
        body: formData
      })

      if (fileUploadRes.ok) {
        image = `/avatar/${userSession.id}`
      }
    }

    const res = await fetch('/api/user/info', {
      method: 'PUT',
      body: JSON.stringify({ ...formData, image })
    })
    if (res.ok) {
      const newInfo = await res.json()
      updateSession({ name: newInfo.name })
      toast('修改個人資料成功', getToastOption())
      setOpenDialog(false)
    } else {
      const error = await res.json()
      setError(error)
    }
    setIsPending(false)
  }

  const [showEm, setShowEm] = useState(false)

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className={`bg-bgColorSecondary border-headingColor drop-shadow-md data-[state=open]:animate-[dialog-content-show_300ms]
                    data-[state=closed]:animate-[dialog-content-hide_300ms]`}>
        <DialogTitle className="text-2xl font-bold mx-auto -mb-3">
          修改個人資料
        </DialogTitle>
        <DialogDescription className="text-2xl">
          <form className="grid gap-2 text-fontColor/70" onSubmit={e => e.preventDefault()}>
            <div className="">
              {/* <Avatar
                className={`w-[200px] h-[200px] mx-auto -mb-5 cursor-pointer ${(userSession.role !== 'TEACHER' || !showAvatar) && 'hidden'}`}
                onClick={handleTriggerFileInput}
              >
                <AvatarImage src={preViewSrc} />
                <AvatarFallback>{formData.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <Input id="file-input" className='hidden' type="file" accept="image/*" onChange={handleUploadFile} /> */}
              <div className={`${showEm && 'hidden'}`}>
                <div>
                  <Label htmlFor='name' className='ml-3'>姓名</Label>
                  <Input
                    id="name"
                    className='rounded-full'
                    value={formData.name}
                    onChange={e => handleSetValue('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor='birth' className='ml-3'>生日</Label>
                  <Input
                    id="birth"
                    type="date"
                    className='rounded-full'
                    value={formData.birth}
                    onChange={e => handleSetValue('birth', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor='phone' className='ml-3'>手機</Label>
                  <Input
                    id="phone"
                    className='rounded-full'
                    value={formData.phone}
                    onChange={e => handleSetValue('phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor='address' className='ml-3'>地址</Label>
                  <Input
                    id="address"
                    className='rounded-full'
                    value={formData.address}
                    onChange={e => handleSetValue('address', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor='gender' className='ml-3'>性別</Label>
                  <RadioGroup value={formData.gender} className='flex gap-4 mt-1 ml-3' onValueChange={(value) => {
                    if (value) {
                      setFormData({ ...formData, gender: value })
                    }
                  }}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="FEMALE" id="female" />
                      <Label htmlFor="female">女性</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="MALE" id="male" />
                      <Label htmlFor="male">男性</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor='medical' className='ml-3'>病史或曾經受傷部位</Label>
                  <Textarea
                    id="medical"
                    className='mt-1 border-headingColor rounded-t-2xl rounded-l-2xl placeholder:text-fontColor/60'
                    placeholder='請簡述相關病史或曾經受傷部位'
                    value={formData.medical}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, medical: e.target.value }))
                    }}
                  />
                </div>
              </div>
              <Accordion onValueChange={value => setShowEm(value === 'item-1')} type="single" collapsible className="w-full -my-5">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-[14px] px-3 flex justify-start">緊急聯絡人</AccordionTrigger>
                  <AccordionContent className="-mt-5">
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor='em_name' className='ml-3'>姓名</Label>
                        <Input
                          id="em_name"
                          className='rounded-full'
                          value={formData.em_name}
                          onChange={e => handleSetValue('em_name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor='em_relation' className='ml-3'>關係</Label>
                        <Input
                          id="em_relation"
                          className='rounded-full'
                          value={formData.em_relation}
                          onChange={e => handleSetValue('em_relation', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor='em_phone' className='ml-3'>手機</Label>
                        <Input
                          id="em_phone"
                          className='rounded-full'
                          value={formData.em_phone}
                          onChange={e => handleSetValue('em_phone', e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {error && <span
                className='text-[14px] ml-3 -mb-6 text-primary/80'>{error}
              </span>}
              <LoadingButton
                className='text-2xl h-10 mt-3 w-full'
                onClick={handleUpdateInfo}
                isLoading={isPending}
              >修改個人資料
              </LoadingButton>
            </div>
          </form>
        </DialogDescription >
      </DialogContent >
    </Dialog >
  )
}
