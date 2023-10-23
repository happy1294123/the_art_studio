'use client'
import TheTitle from "@/components/TheTitle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import getToastOption from "@/lib/getToastOption"
import { useState } from "react"
import toast from "react-hot-toast"
import ClipLoader from 'react-spinners/ClipLoader'

export default function ForgetPwdPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleSendMail = async () => {
    setIsLoading(true)
    const res = await fetch('/api/user/forgetPwd', {
      method: 'POST',
      body: JSON.stringify(email)
    })
    if (res.ok) {
      toast('郵件發送成功', getToastOption())
    } else {
      setError('該電子郵件尚未成為會員')
    }
    setIsLoading(false)
  }

  return (
    <div className="flex-center items-center" style={{ height: `calc(100vh - 200px)` }}>
      <div className="grid place-content-center md:p-9 p-4 md:pt-3 pt-1 bg-bgColorOther w-fit mx-auto rounded-3xl">
        <div className="mx-auto">
          <TheTitle>忘記密碼</TheTitle>
        </div>
        <div className="mx-auto text-center">
          <p>在下方輸入信箱地址後</p>
          <p>系統將發送重置密碼郵件至您的信箱</p>
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <div>
            <Input
              className="rounded-full mt-2 w-[300px] text-center border-gray-400"
              placeholder="請輸入電子郵件"
              value={email}
              onChange={e => {
                error && setError('')
                setEmail(e.target.value)
              }}
              type="email"
            />
          </div>
          {error && <span className="flex-center text-primary/80">{error}</span>}
          <div className="flex-center mt-2">
            {isLoading ? <div className="flex-center mx-auto mt-2">
              <span className="text-gray-400 mr-1">發送中</span>
              <ClipLoader size={20} color="#D1C0AD" />
            </div>
              : <Button onClick={handleSendMail}>發送郵件</Button>}
          </div>
        </form>
      </div>
    </div>
  )
}
