'use client'
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from 'nprogress';

export default function NprogressBar() {
  NProgress.configure({ showSpinner: true });

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    console.log('change page')
    // console.log('router', router)
    // console.log('url', `${pathname}?${searchParams}`)
    NProgress.done()

    // const handleFinish = () => {
    //   console.log('finish')
    // }
    // handleFinish()
    // document.addEventListener('DOMContentLoaded', handleFinish, false);

    // return document.removeEventListener('DOMContentLoaded', handleFinish)
    // router.events.on('routeChangeStart', () => NProgress.start());
    // router.events.on('routeChangeComplete', () => NProgress.done());
    // router.events.on('routeChangeError', () => NProgress.done());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div>NprogressBar</div>
  )
}
