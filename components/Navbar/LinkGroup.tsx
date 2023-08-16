import { useState } from 'react';
import Link from 'next/link'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FaCaretDown } from "react-icons/fa";

type Props = {
  handleNavigate: Function
}

export default function LinkGroup({ handleNavigate }: Props) {
  const [expandCourse, setExpandCourse] = useState(false)
  const [expandAboutAs, setExpandAboutAs] = useState(false)

  return (
    <div className="text-xl md:flex gap-5 text-fontColor">
      <div className="hover:bg-bgColor md:hover:bg-secondary rounded-xl p-2 duration-300 cursor-pointer md:h-auto" onClick={() => handleNavigate('/')}>最新消息</div>
      <Collapsible className="hover:bg-bgColor md:hover:bg-secondary rounded-xl duration-300 cursor-pointer">
        <CollapsibleTrigger className='flex w-full h-full md:w-auto md:h-auto p-2' onClick={() => setExpandCourse(!expandCourse)}>
          關於課程 <FaCaretDown className={`my-auto ml-1 ${expandCourse && 'rotate-180'}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="text-primary ml-4 grid gap-1 md:absolute">
          <div className="cursor-pointer" onClick={() => handleNavigate('/course')}>預約課程</div>
          <div className="cursor-pointer" onClick={() => handleNavigate('/course-intro')}>課程介紹</div>
          <div className='mb-1'><Link href="/">師資介紹</Link></div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="hover:bg-bgColor md:hover:bg-secondary rounded-xl duration-300 cursor-pointer">
        <CollapsibleTrigger className='flex w-full h-full md:w-auto md:h-auto p-2' onClick={() => setExpandAboutAs(!expandAboutAs)}>
          關於我們 <FaCaretDown className={`my-auto ml-1 ${expandAboutAs && 'rotate-180'}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="text-primary ml-4 grid gap-1 md:absolute">
          <div><Link href="/">教室環境</Link></div>
          <div><Link href="/">空間理念</Link></div>
          <div className='mb-1'><Link href="/">聯絡資訊</Link></div>
        </CollapsibleContent>
      </Collapsible>
      <div className="hover:bg-bgColor md:hover:bg-secondary rounded-xl p-2 duration-300 cursor-pointer" onClick={() => handleNavigate('/')}>合作品牌</div>
    </div>
  )
}
