'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import getToastOption from "@/lib/getToastOption";
import { useState } from "react";
import ClipLoader from 'react-spinners/ClipLoader'

export default function UnVarify() {
  const router = useRouter()
  const { data: session } = useSession()
  const [sending, setSending] = useState(false)

  const handleReSendMail = async () => {
    setSending(true)
    const res = await fetch('/api/register/sendVarifyMail', {
      method: 'POST',
      body: JSON.stringify({
        email: session?.user.email
      })
    })
    if (res.ok) {
      toast('郵件發送成功', getToastOption())
    }
    setSending(false)
  }

  return (
    <div className="grid h-full gap-3 place-content-center text-center">
      <h1 className="text-3xl text-headingColor">會員尚未驗證通過</h1>
      <div>請至信箱點擊驗證按鈕</div>
      {sending ? <div className="flex-center mx-auto mt-2">
        <span className="text-gray-400 mr-1">發送中</span>
        <ClipLoader size={20} color="#D1C0AD" />
      </div>
        : <div className="underline underline-offset-4 cursor-pointer" onClick={handleReSendMail}>重新發送信件</div>}
      <Button onClick={() => router.back()}>上一頁</Button>
    </div>
  )
}
