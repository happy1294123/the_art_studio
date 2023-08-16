import { useState } from 'react';
import Link from 'next/link'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FaCaretDown } from "react-icons/fa";

export default function LinkGroup() {
  const [expandCourse, setExpandCourse] = useState(false)
  const [expandAboutAs, setExpandAboutAs] = useState(false)

  return (
    <>
      <div><Link href="/">最新消息</Link></div>
      <Collapsible>
        <CollapsibleTrigger className='flex' onClick={() => setExpandCourse(!expandCourse)}>
          關於課程 <FaCaretDown className={`my-auto ml-1 ${expandCourse && 'rotate-180'}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="text-[#6A6A6A] mb-5">
          <div><Link href="/">預約課程</Link></div>
          <div><Link href="/">課程介紹</Link></div>
          <div><Link href="/">師資介紹</Link></div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger className='flex' onClick={() => setExpandAboutAs(!expandAboutAs)}>
          關於我們 <FaCaretDown className={`my-auto ml-1 ${expandAboutAs && 'rotate-180'}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="text-[#6A6A6A] mb-5">
          <div><Link href="/">教室環境</Link></div>
          <div><Link href="/">空間理念</Link></div>
          <div><Link href="/">聯絡資訊</Link></div>
        </CollapsibleContent>
      </Collapsible>
      <div><Link href="/">合作品牌</Link></div>
    </>
  )
}
