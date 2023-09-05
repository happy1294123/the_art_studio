import { useState } from 'react';
import LinkWithAnim from './LinkWithAnim';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { BsChevronDown } from 'react-icons/bs'

export default function LinkGroup() {
  const [expandCourse, setExpandCourse] = useState(false)
  const [expandAboutAs, setExpandAboutAs] = useState(false)

  return (
    <div className="text-xl md:flex gap-5 text-fontColor">
      <LinkWithAnim href="/" className="md:h-10 p-2 pl-6">最新消息</LinkWithAnim>
      <Collapsible className="rounded-xl pl-4" open={expandCourse} onMouseEnter={() => setExpandCourse(true)}
        onMouseLeave={() => setExpandCourse(false)} asChild>
        <motion.div
          initial={{ backgroundColor: '#D1C0AD' }}
          whileHover={{ backgroundColor: '#EDDFCF' }}
          transition={{ duration: 0.3 }}
        >
          <CollapsibleTrigger
            className='flex w-full h-full md:w-auto md:h-auto p-2'
            onClick={() => {
              setExpandCourse(!expandCourse)
              setExpandAboutAs(false)
            }}

          >
            關於課程 <BsChevronDown className={`text-sm my-auto ml-1 ${expandCourse && 'rotate-180'}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4 grid gap-1" asChild>
            {expandCourse && (
              <motion.div
                key="course"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <LinkWithAnim href="/course">預約課程</LinkWithAnim>
                <LinkWithAnim href="/">課程介紹</LinkWithAnim>
                <div className='mb-1'><LinkWithAnim href="/">師資介紹</LinkWithAnim></div>
              </motion.div>
            )
            }
          </CollapsibleContent>
        </motion.div>
      </Collapsible>
      <Collapsible className={`${expandAboutAs && 'bg-bgColorOther'} rounded-xl pl-4`} open={expandAboutAs} onMouseEnter={() => setExpandAboutAs(true)}
        onMouseLeave={() => setExpandAboutAs(false)} asChild>
        <motion.div
          initial={{ backgroundColor: '#D1C0AD' }}
          whileHover={{ backgroundColor: '#EDDFCF' }}
          transition={{ duration: 0.3 }}
        >
          <CollapsibleTrigger
            className='flex w-full h-full md:w-auto md:h-auto p-2'
            onClick={() => {
              setExpandAboutAs(!expandAboutAs)
              setExpandCourse(false)
            }}
          >
            關於我們 <BsChevronDown className={`text-sm my-auto ml-1 ${expandAboutAs && 'rotate-180'}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4 grid gap-1" asChild>
            <AnimatePresence initial={false}>
              {expandAboutAs && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div><LinkWithAnim href="/">教室環境</LinkWithAnim></div>
                  <div><LinkWithAnim href="/">空間理念</LinkWithAnim></div>
                  <div className='mb-1'><LinkWithAnim href="/">聯絡資訊</LinkWithAnim></div>
                </motion.div>
              )}
            </AnimatePresence>
          </CollapsibleContent>
        </motion.div>
      </Collapsible>
      <LinkWithAnim className="my-list-item md:h-10 p-2 pl-6" href="/">合作品牌</LinkWithAnim>
    </div >
  )
}
