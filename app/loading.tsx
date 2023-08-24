'use client'
import NProgress from 'nprogress';
import { useEffect } from 'react';

export default function Loading() {
  NProgress.configure({ showSpinner: false });


  useEffect(() => {
    NProgress.start()
    return () => { NProgress.done() }
  }, [])

  // return <LoadingSkeleton />
}
