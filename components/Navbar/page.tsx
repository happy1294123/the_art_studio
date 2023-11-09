'use client';
import { useRef, useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import IconHamburger from '@/components/icon/IconHamburger'
import { Button } from '@/components/ui/button'
import LinkGroup from './LinkGroup';
import MdLinkGroup from './MdLinkGroup';
import LoginBtnOrUserProfile from '@/components/Navbar/LoginBtnOrUserProfile'
import { useSession } from "next-auth/react"
import ManageLink from './ManageLink';
import LinkWithAnim from './LinkWithAnim';

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { data: session } = useSession()
  const isLogin = !!session
  const isManager = session && ['ADMIN', 'EDITOR'].includes(session.user.role)
  const isTeacher = session && session.user.role === 'TEACHER'

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
  useEffect(() => setShowSidebar(false), [pathname])

  // const [showMdLink, setShowMdLink] = useState(false)
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 60) {
  //       setShowMdLink(true)
  //     }
  //   }
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <>
      {(pathname !== '/login' && pathname !== '/register') &&
        <div className={`flex justify-between h-[60px] px-6 lg:px-12 ${pathname !== '/' && 'bg-bgColorSecondary'}  w-full items-center`}>
          {/* ${showMdLink ? 'block' : 'hidden'} */}
          <Link href="/" className={`my-auto ${pathname === '/' && 'invisible md:visible'}`}>
            <Image src="/logoWithText3x.png" width={150} height={35} alt="logo" />
          </Link>
          {showSidebar ? (
            <Button variant="secondary" className="z-30 bg-bgColorOther rounded-full text-lg font-bold drop-shadow-lg px-3 my-auto" onClick={() => setShowSidebar(false)}>X</Button>
          ) : (
            <div>
              <Button variant="link" className="p-2 md:hidden my-auto" onClick={() => setShowSidebar(true)}>
                <IconHamburger />
              </Button>
              <div className={`hidden md:block w-50 h-[37px] my-auto`}>
                  <MdLinkGroup isManager={isManager} isTeacher={isTeacher} isLogin={isLogin} />
              </div>
            </div>
          )}
        </div>
      }
      {showSidebar && (<div className='top-0 left-0 absolute w-full h-full bg-gray-800 z-10 opacity-30'></div>)}

      <div className={`border-s-2 border-gray-400 rounded-s-2xl drop-shadow-2xl top-0 end-0 h-full w-8/12 z-20 bg-bgColorSecondary fixed container ease-in-out duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full'} ${loaded ? 'block' : 'hidden'}`} ref={sidebarRef}>
        <div className='mt-14 text-xl grid gap-2'>
          {isManager && <ManageLink />}
          {isTeacher && (<LinkWithAnim href='/teacher' className="text-md md:text-xl ml-6 md:ml-0 mb-2 md:mb-0">
            老師專區
          </LinkWithAnim >)}
          <LoginBtnOrUserProfile isLogin={isLogin} />
          <LinkGroup />
        </div>
      </div >
    </>
  )
}