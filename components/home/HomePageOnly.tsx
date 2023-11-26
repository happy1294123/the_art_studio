'use client'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
const GoogleArea = dynamic(() => import('@/components/home/GoogleArea'), { ssr: false })

export default function HomePageOnly({ apiKey }: { apiKey: string | undefined }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2000) {
        setShow(true)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const pathname = usePathname()

  return (
    <div>
      {(pathname === '/' && apiKey && show) && <GoogleArea apiKey={apiKey} />}
    </div>
  )
}
