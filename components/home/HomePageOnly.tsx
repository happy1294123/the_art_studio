'use client'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
const GoogleArea = dynamic(() => import('@/components/home/GoogleArea'))

export default function HomePageOnly({ apiKey }: { apiKey: string }) {
  const pathname = usePathname()

  return (
    <div>
      {pathname === '/' && <GoogleArea apiKey={apiKey} />}
    </div>
  )
}
