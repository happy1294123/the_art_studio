'use client'
import { signOut } from 'next-auth/react'

export default function UserPage() {

  return (
    <div>個人頁面  若尚未驗證email則無法顯示頁面
      <div onClick={() => signOut()} className="bg-red-400 text-center p-3 mt-3 text-white cursor-pointer">Log Out</div>
    </div>
  )
}
