'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { usePathname } from "next/navigation";

import IconHamburger from '@/components/icon/IconHamburger'
import { Button } from '@/components/ui/button'
import LinkGroup from './LinkGroup';

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleHideSidebar = (event: MouseEvent) => {
      if (!sidebarRef.current?.contains((event.target as Element))) {
        setShowSidebar(false)
      }
    };
    window.addEventListener("mousedown", handleHideSidebar);
    return () => window.removeEventListener("mousedown", handleHideSidebar);
  }, [sidebarRef])

  useEffect(() => setLoaded(true), [])

  const handleNavigate = (url: string) => {
    setShowSidebar(false)
    router.push(url)
  }

  return (
    <>
      <div className="flex justify-end mt-4">
        {showSidebar ? (
          <Button className="z-30 rounded-full text-lg font-bold drop-shadow-lg" onClick={() => setShowSidebar(false)}>X</Button>
        ) : (
          <>
            <Button variant="link" className="p-2 md:hidden" onClick={() => setShowSidebar(true)}>
              <IconHamburger />
            </Button>
            <div className='hidden md:block w-50 h-[37px]'>
              <LinkGroup key={pathname} handleNavigate={handleNavigate} />
            </div>
          </>
        )}
      </div>
      {showSidebar && (<div className='top-0 left-0 absolute w-full h-full bg-gray-800 z-10 opacity-30'></div>)}

      <div className={`border-s-2 border-gray-400 rounded-s-2xl drop-shadow-2xl top-0 end-0 h-full w-8/12 z-20 bg-secondary fixed container ease-in-out duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full'} ${loaded ? 'block' : 'hidden'}`} ref={sidebarRef}>
        <div className='mt-6 flex cursor-pointer' onClick={() => handleNavigate('/')}>
          <Image src="/logo.svg" width={40} height={40} alt="logo image" />
          <span className='mt-auto ml-1 text-fontColor text-2xl'>媞藝術空間</span>
        </div>
        {/* <div>登入</div> */}
        <div className='mt-14 text-xl grid gap-2'>
          <LinkGroup key={pathname} handleNavigate={handleNavigate} />
        </div>
      </div >
    </>
  )
}