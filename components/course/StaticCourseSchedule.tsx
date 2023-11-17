import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { IoClose } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'

export default function StaticCourseSchedule({ staticSchedulePath }: { staticSchedulePath: string }) {
  const [show, setShow] = useState(false)

  const ImageMemo = useMemo(() => (<Image src={staticSchedulePath} width={650} height={650} alt="course schedule" priority />), [staticSchedulePath])

  return (<>
    <Button variant="ghost"
      className='text-gray-400 pb-2 rounded-xl underline underline-offset-4 text-base -mr-1'
      onClick={() => setShow(!show)}
    >
      課表
    </Button>
    <AnimatePresence>
      {show && (
        <div className='fixed inset-0 backdrop-blur-sm z-50' onClick={() => setShow(false)}>
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.3
            }}
            className='fixed inset-x-0 bottom-0 z-50 bg-background/80 bg-white rounded-t-[50px] shadow-inner border'
            onClick={e => e.stopPropagation()}
          >
            <div className='absolute right-5 top-5 cursor-pointer' onClick={() => setShow(false)}>
              <IoClose fontSize={30} />
            </div>
            <div className='my-8  mx-auto grid place-content-center rounded-3xl overflow-hidden h-1/2 w-8/12'>
              {ImageMemo}
            </div>
          </motion.div>
        </div >
      )
      }
    </AnimatePresence>
  </>)
}
