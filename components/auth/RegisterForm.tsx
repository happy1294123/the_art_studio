'use client'
import { useTransition, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FloatLabelInput from '@/components/FloatLabelInput'
import RingLoader from 'react-spinners/RingLoader'
import { useRouter } from 'next/navigation'
// import { revalidatePath, revalidateTag } from 'next/cache'

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition()
  const ref = useRef<HTMLFormElement>(null)
  const [error, setError] = useState({ name: '', message: '' })
  const router = useRouter()

  const handleSubmit = (data: FormData) => {
    if (data.get('password') !== data.get('confirmPassword')) {
      (ref.current?.querySelector(`input[name="confirmPassword"]`) as HTMLInputElement)?.select()
      setError({ name: 'confirmPassword', message: '密碼不一致' })
      return
    }

    startTransition(async () => {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: data
      })
      if (res.ok) {
        router.replace('/user')
      } else {
        const error = await res.json();
        setError(error);
        (ref.current?.querySelector(`input[name="${error.name}"]`) as HTMLInputElement)?.select()
      }
    })
  }

  const checkError = (name: string) => {
    if (error.name === name) {
      return error.message
    }
    return ''
  }

  return (
    <div className="bg-bgColorSecondary rounded-xl p-5 pb-3 shadow-xl">
      <div className="bg-slate-400 max-w-fit rounded-full mx-auto">
        <Link href="/">
          <Image src="/logoBW.png" width={65} height={65} alt='logo' className="-mt-14 drop-shadow-2xl" />
        </Link>
      </div>
      <form className="flex flex-col" action={handleSubmit} ref={ref}>
        <FloatLabelInput
          autoFocus
          required
          name="name"
          labelText='名稱'
          className='mt-8
          bg-bgColorSecondary' />
        <FloatLabelInput
          error={checkError('email')}
          onChange={() => setError({
            name: '',
            message: ''
          })}
          required
          name="email"
          labelText='電子郵件'
          type='email'
          className='mt-8
          bg-bgColorSecondary' />
        <FloatLabelInput
          error={checkError('password')}
          onChange={() => setError({
            name: '',
            message: ''
          })}
          required
          name="password"
          labelText='密碼'
          type='password'
          className='mt-8
          bg-bgColorSecondary' />
        <FloatLabelInput
          error={checkError('confirmPassword')}
          onChange={() => setError({
            name: '',
            message: ''
          })}
          required
          name="confirmPassword"
          labelText='確認密碼'
          type='password'
          className='mt-8
          bg-bgColorSecondary' />
        <div className="flex gap-2 text-sm justify-end mr-2 text-gray-500  underline-offset-4 mt-5">
          <Link href="/login" className="hover:underline underline-offset-4">已經是會員？</Link>
        </div>
        {error.name === 'database' && <span className="text-primary/80 -mt-6 animate-shake">{error.message}</span>}
        <Button className="w-full my-1 h-9 text-xl">
          <span className={`${isPending && 'hidden'}`}>成為會員</span>
          <RingLoader speedMultiplier={1.5} size={25} color="#FFF" loading={isPending} />
        </Button>
      </form>
    </div>
  )
}