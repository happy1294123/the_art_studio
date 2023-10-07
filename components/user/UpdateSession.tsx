'use client'
import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ClipLoader from 'react-spinners/ClipLoader'

export default function UpdateSession() {
  const { update } = useSession()
  update({
    email_varified: true
  })
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  return (
    <div>
      <Button className="flex-center mt-3 mx-auto" onClick={() => {
        setLoading(true)
        router.replace('/user')
      }}>個人頁面</Button>
      {loading && <div className="flex-center mx-auto mt-2">
        <ClipLoader size={20} color="#D1C0AD" />
      </div>}
    </div>
  )
}
