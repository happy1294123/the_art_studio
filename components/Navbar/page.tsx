'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

import IconHamburger from '@/components/icon/IconHamburger'
import { Button } from '@/components/ui/button'
import LinkGroup from './LinkGroup';


export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleHideSidebar = (event: MouseEvent) => {
      if (!sidebarRef.current?.contains((event.target as Element))) {
        setShowSidebar(false)
      }
    };
    window.addEventListener("mousedown", handleHideSidebar);
    return () => window.removeEventListener("mousedown", handleHideSidebar);
  }, [sidebarRef])

  return (
    <>
      <div className="flex justify-end mt-4">
        {showSidebar ? (
          <Button className="z-30 rounded-full text-lg font-bold" onClick={() => setShowSidebar(false)}>X</Button>
        ) : (
          <>
            <Button variant="link" className="p-2 md:hidden" onClick={() => setShowSidebar(true)}>
              <IconHamburger />
            </Button>
            <div className='hidden md:block w-50 h-[37px]'>
              <div className='text-xl flex gap-5'>
                <LinkGroup />
              </div>
            </div>
          </>
        )}
      </div>

      <div className={`top-0 end-0 h-full w-8/12 z-20 bg-secondary fixed container ease-in-out duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`} ref={sidebarRef}>
        <div className='mt-6 flex'>
          <Image src="/logo.svg" width={30} height={30} alt="logo image" />
          <span className='mt-auto ml-1'>媞藝術空間</span>
        </div>
        <div className='mt-14 text-xl grid gap-2'>
          <LinkGroup />
        </div>
      </div >
    </>
  )
}