'use client'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
const GoogleArea = dynamic(() => import('@/components/home/GoogleArea'))

export default function HomePageOnly() {
  const pathname = usePathname()

  return (
    <div>
      {pathname === '/' && <GoogleArea />}
    </div>
  )
}
