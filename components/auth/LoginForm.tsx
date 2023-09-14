'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FloatLabelInput from '@/components/FloatLabelInput'
import { signIn } from 'next-auth/react'
import RingLoader from 'react-spinners/RingLoader'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

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
        router.replace(callbackUrl)
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
      <div className="bg-slate-400 max-w-fit rounded-full mx-auto">
        <Link href="/">
          <Image src="/logoBW.png" width={65} height={65} alt='logo' className="-mt-14" priority />
        </Link>
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
            <span>忘記密碼</span>
          </div>
        </div>
        <Button className="w-full my-1 h-9 text-xl" onClick={handleSubmitLogin}>
          <span className={`${isLoading && 'hidden'}`}>登入</span>
          <RingLoader speedMultiplier={1.5} size={25} color="#FFF" loading={isLoading} />
        </Button>
      </form>
    </div>
  )
}