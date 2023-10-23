'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import LoadingButton from "../LoadingButton"

export default function UpdateSession() {
  const { update } = useSession()
  update({
    email_varified: true
  })
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  return (
    <div>
      <LoadingButton className="flex-center mt-3 mx-auto w-[90px]" isLoading={loading} onClick={() => {
        setLoading(true)
        router.replace('/user')
      }}>
        個人頁面
      </LoadingButton>
    </div>
  )
}
