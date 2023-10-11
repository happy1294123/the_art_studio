'use client'
import Image from 'next/image'
import Link from 'next/link'
import FloatLabelInput from '@/components/FloatLabelInput'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import LoadingButton from '../LoadingButton'

export default function LoginForm() {
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmitLogin = async () => {
    setIsLoading(true)
    try {
      const res = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })
      if (res?.error) {
        console.log(res)
        setError('電子郵件或密碼有誤')
        setIsLoading(false)
        return
      }
      const callbackUrl = searchParams.get('callbackUrl')
      if (callbackUrl) {
        console.log(callbackUrl)
        router.replace(callbackUrl)
        return
      }
      if (formData.email.startsWith('admin@')) {
        router.replace('/manage')
        return
      }

      router.replace('/user')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-bgColorSecondary rounded-xl p-5 pb-3 shadow-xl">
      <div className="max-w-fit rounded-full mx-auto -mt-14 relative cursor-pointer"
        onClick={() => router.push('/')}
      >
        <Image src="/logoBW.png" width={65} height={65} alt='logo' />
      </div>
      <form onSubmit={e => e.preventDefault()}>
        <div className="flex flex-col">
          <FloatLabelInput autoFocus name="email" labelText='電子郵件' type='email' className='mt-8 bg-bgColorSecondary'
            onChange={(e) => setFormData({ email: e.target.value, password: formData.password })} />
          <FloatLabelInput name="password" labelText='密碼' type='password' className='mt-8 bg-bgColorSecondary'
            onChange={(e) => setFormData({ email: formData.email, password: e.target.value })} />
        </div>
        <div className="flex text-sm justify-between mr-2 text-gray-500  underline-offset-4 mt-5">
          {error && <span className="text-primary/80 animate-shake">{error}</span>}
          <div className='ml-auto'>
            <Link href="/register" className="hover:underline underline-offset-4 mr-2">註冊會員</Link>
            <Link href="/user/forgetPwd" className="hover:underline underline-offset-4">忘記密碼</Link>
          </div>
        </div>
        <LoadingButton className="w-full my-1 h-9 text-xl" onClick={handleSubmitLogin} isLoading={isLoading}>登入</LoadingButton>
      </form>
    </div>
  )
}
