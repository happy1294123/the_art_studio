'use client'
import { useRef, useState, UIEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FloatLabelInput from '@/components/FloatLabelInput'
import RingLoader from 'react-spinners/RingLoader'
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '../ui/textarea'

export default function RegisterForm() {
  const ref = useRef<HTMLFormElement>(null)
  const [error, setError] = useState({ name: '', message: '' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birth: '',
    phone: '',
    address: '',
    gender: '',
    medical: '',
    em_name: '',
    em_relation: '',
    em_phone: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const requiredFieldList = [
    { field: 'name', cnField: '姓名' },
    { field: 'email', cnField: '電子郵件' },
    { field: 'password', cnField: '密碼' },
    { field: 'birth', cnField: '生日' },
    { field: 'em_name', cnField: '緊急聯絡人姓名' },
    { field: 'em_relation', cnField: '緊急聯絡人關係' },
    { field: 'em_phone', cnField: '緊急聯絡人手機' },
  ]
  const handleSubmit = async () => {
    setIsLoading(true)

    for (let { field, cnField } of requiredFieldList) {
      if (!formData[field as keyof typeof formData]) {
        (ref.current?.querySelector(`input[name="${field}"]`) as HTMLInputElement)?.select()
        setError({ name: field, message: `${cnField}是必填欄位` })
        setIsLoading(false)
        return
      }
    }

    if (formData.password !== formData.confirmPassword) {
      (ref.current?.querySelector(`input[name="confirmPassword"]`) as HTMLInputElement)?.select()
      setError({ name: 'confirmPassword', message: '密碼不一致' })
      setIsLoading(false)
      return
    }

    if (!formData.gender) {
      setError({ name: 'gender', message: '必填欄位' })
      setIsLoading(false)
      return
    }

    if (!medicalRadio.hasCheck) {
      setError({ name: 'medical', message: '必填欄位' })
      setIsLoading(false)
      return
    }

    if (medicalRadio.showText && !formData.medical) {
      setError({ name: 'medical', message: '請簡述' })
      setIsLoading(false)
      return
    }

    if (!finishRead) {
      setError({ name: 'database', message: '請閱讀會員條款' })
      setIsLoading(false)
      return
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    if (res.ok) {
      router.replace('/login?register=success')
    } else {
      console.log("not ok")
      const error = await res.json();
      setError(error);
      setIsLoading(false);
      (ref.current?.querySelector(`input[name="${error.name}"]`) as HTMLInputElement)?.select()
    }
  }

  const checkError = (name: string) => {
    if (error.name === name) {
      return error.message
    }
    return ''
  }

  const [finishRead, setFinishRead] = useState(false)
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    const { scrollHeight, clientHeight, scrollTop } = target;
    if (scrollHeight - clientHeight <= scrollTop + 1) {
      setFinishRead(true)
    }
  }

  const [medicalRadio, setMedicalRadio] = useState({
    hasCheck: false,
    showText: false,
  })
  const handleChangeMedical = (value: string) => {
    setMedicalRadio(prev => ({ ...prev, hasCheck: true }))
    setError({ name: '', message: '' })
    setMedicalRadio(prev => ({ ...prev, showText: value === 'has_medical' }))
  }

  return (
    <div className="bg-bgColorSecondary rounded-xl p-5 pb-3 shadow-xl mt-16 mb-8">
      <div className="bg-slate-400 max-w-fit rounded-full mx-auto">
        <Link href="/">
          <Image src="/logoBW.png" width={65} height={65} alt='logo' className="-mt-14" />
        </Link>
      </div>
      <form className="flex flex-col" onSubmit={(e) => e.preventDefault()} ref={ref}>
        <label className='text-headingColor -mb-3'>會員資料</label>
        <FloatLabelInput
          error={checkError('name')}
          autoFocus
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          name="name"
          labelText='姓名'
          className='mt-8
          bg-bgColorSecondary' />
        <FloatLabelInput
          error={checkError('email')}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value })
            setError({
              name: '',
              message: ''
            })
          }}
          required
          name="email"
          labelText='電子郵件'
          type='email'
          className='mt-8
          bg-bgColorSecondary' />
        <FloatLabelInput
          error={checkError('password')}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value })
            setError({
              name: '',
              message: ''
            })
          }}
          required
          name="password"
          labelText='密碼'
          type='password'
          className='mt-8
          bg-bgColorSecondary' />
        <FloatLabelInput
          error={checkError('confirmPassword')}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e.target.value })
            setError({
              name: '',
              message: ''
            })
          }}
          required
          name="confirmPassword"
          labelText='確認密碼'
          type='password'
          className='mt-8
          bg-bgColorSecondary' />
        <FloatLabelInput
          error={checkError('birth')}
          onChange={(e) => {
            setFormData({ ...formData, birth: e.target.value })
            setError({
              name: '',
              message: ''
            })
          }}
          name="birth"
          labelText='生日'
          type='text'
          onFocus={e => e.target.type = 'date'}
          onBlur={e => e.target.type = 'text'}
          className='mt-8
          bg-bgColorSecondary' />
        <FloatLabelInput
          error={checkError('phone')}
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value })
            setError({
              name: '',
              message: ''
            })
          }}
          required
          name="phone"
          labelText='手機'
          className='mt-8
          bg-bgColorSecondary' />
        <FloatLabelInput
          error={checkError('address')}
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value })
            setError({
              name: '',
              message: ''
            })
          }}
          name="address"
          labelText='地址 (選填)'
          className='mt-8
          bg-bgColorSecondary' />

        <div className='mt-2'>
          <Label className='text-fontColor/60'>性別
            {error.name === 'gender' && <span className='ml-2 text-primary/80'>{error.message}</span>}
          </Label>
          <RadioGroup defaultValue="" className='flex gap-4 mt-1' onValueChange={(value) => {
            if (value) {
              setFormData({ ...formData, gender: value })
              setError({ name: '', message: '' })
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

        <div className='mt-2'>
          <Label className='text-fontColor/60'>是否有相關病史或曾經受傷的部位
            {error.name === 'medical' && <span className='ml-2 text-primary/80'>{error.message}</span>}
          </Label>
          <RadioGroup defaultValue="" className='flex gap-8 mt-1' onValueChange={handleChangeMedical}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no_medical" id="no_medical" />
              <Label htmlFor="no_medical">否</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="has_medical" id="has_medical" />
              <Label htmlFor="has_medical">有</Label>
            </div>
          </RadioGroup>
          {medicalRadio.showText &&
            <Textarea
              className='mt-2 border-headingColor rounded-t-2xl rounded-l-2xl placeholder:text-fontColor/60'
              placeholder='請簡述相關病史或曾經受傷部位'
              onChange={e => {
                setError({ name: '', message: '' })
                setFormData(prev => ({ ...prev, medical: e.target.value }))
              }}
            />}
        </div>

        <label className='text-headingColor mt-8 -mb-3'>緊急聯絡人</label>
        <FloatLabelInput
          error={checkError('em_name')}
          onChange={(e) => {
            setFormData({ ...formData, em_name: e.target.value })
            setError({
              name: '',
              message: ''
            })
          }}
          required
          name="em_name"
          labelText='緊急聯絡人姓名'
          className='mt-8
          bg-bgColorSecondary' />
        <FloatLabelInput
          error={checkError('em_relation')}
          onChange={(e) => {
            setFormData({ ...formData, em_relation: e.target.value })
            setError({
              name: '',
              message: ''
            })
          }}
          required
          name="em_relation"
          labelText='緊急聯絡人關係'
          className='mt-8
          bg-bgColorSecondary' />
        <FloatLabelInput
          error={checkError('em_phone')}
          onChange={(e) => {
            setFormData({ ...formData, em_phone: e.target.value })
            setError({
              name: '',
              message: ''
            })
          }}
          required
          name="em_phone"
          labelText='緊急聯絡人手機'
          className='mt-8
          bg-bgColorSecondary' />

        <div className='bg-bgColorOther mt-4 rounded-2xl p-2'>
          <label className='text-headingColor mt-8'>會員條款</label>
          <div className="overflow-y-auto p-2 w-[280px] h-[150px]" onScroll={handleScroll}>
            {/* <div className='text-headingColor text-2xl mb-1'>會員條款</div> */}
            會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款
          </div>
        </div>

        <div className="flex gap-2 text-sm justify-end mr-2 text-gray-500  underline-offset-4 mt-5">
          <Link href="/login" className="hover:underline underline-offset-4">已經是會員？</Link>
        </div>
        {error.name === 'database' && <span className="text-primary/80 -mt-6 animate-shake">{error.message}</span>}
        <Button className="w-full my-1 h-9 text-xl" onClick={handleSubmit}>
          <span className={`${isLoading && 'hidden'}`}>成為會員</span>
          <RingLoader speedMultiplier={1.5} size={25} color="#FFF" loading={isLoading} />
        </Button>
      </form>
    </div>
  )
}