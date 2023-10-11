'use client'
import { useRef, useState, UIEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FloatLabelInput from '@/components/FloatLabelInput'
import RingLoader from 'react-spinners/RingLoader'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'

export default function RegisterForm() {
  const ref = useRef<HTMLFormElement>(null)
  const [error, setError] = useState({ name: '', message: '' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    if (!formData.name) {
      (ref.current?.querySelector(`input[name="name"]`) as HTMLInputElement)?.select()
      setError({ name: 'name', message: '名稱是必填欄位' })
      setIsLoading(false)
      return
    }
    if (!formData.email) {
      (ref.current?.querySelector(`input[name="email"]`) as HTMLInputElement)?.select()
      setError({ name: 'email', message: '電子郵件是必填欄位' })
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      (ref.current?.querySelector(`input[name="confirmPassword"]`) as HTMLInputElement)?.select()
      setError({ name: 'confirmPassword', message: '密碼不一致' })
      setIsLoading(false)
      return
    }
    if (!finishRead) {
      setError({ name: 'database', message: '請閱讀會員條款' })
      console.log('請閱讀會員條款')
      setIsLoading(false)
      return
    }
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    if (res.ok) {
      router.replace('/user')
      toast('註冊帳號成功', getToastOption())
      toast('請至Email完成信箱驗證', getToastOption())
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

  return (
    <div className="bg-bgColorSecondary rounded-xl p-5 pb-3 shadow-xl">
      <div className="bg-slate-400 max-w-fit rounded-full mx-auto">
        <Link href="/">
          <Image src="/logoBW.png" width={65} height={65} alt='logo' className="-mt-14" />
        </Link>
      </div>
      <form className="flex flex-col" onSubmit={(e) => e.preventDefault()} ref={ref}>
        <FloatLabelInput
          error={checkError('name')}
          autoFocus
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          name="name"
          labelText='名稱'
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

        <div className='overflow-y-auto mt-3  w-[300px] h-[150px]' onScroll={handleScroll}>
          <div className='text-2xl mb-1'>會員條款</div>
          會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款會員條款
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