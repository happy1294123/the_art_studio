import Image from 'next/image'
import { useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function StaticCourseSchedule({ staticSchedulePath }: { staticSchedulePath: string }) {
  const ImageMemo = useMemo(() => (<Image src={staticSchedulePath} width={1200} height={1200} alt="course schedule" priority />), [staticSchedulePath])

  return (<>
    <Dialog>
      <DialogTrigger className='mr-2 underline underline-offset-4'>課表</DialogTrigger>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>當月課表</DialogTitle>
        </DialogHeader>
        <div className='my-8 mx-auto grid place-content-center rounded-3xl overflow-hidden '>
          {ImageMemo}
        </div>
      </DialogContent>
    </Dialog>
  </>)
}
