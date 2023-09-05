import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { motion } from "framer-motion"
import LinkWithAnim from './LinkWithAnim';

export default function MdLinkGroup() {
  const [offsetClass, setOffsetClass] = useState('mr-5')

  return (
    <>
      <NavigationMenu className="opacity-70">
        <NavigationMenuList className="flex flex-col md:flex-row gap-2 md:gap-4">
          <NavigationMenuItem className="data-[highlighted]:bg-red-400">
            <LinkWithAnim href="/" className="text-xl ml-1 md:ml-0">最新消息</LinkWithAnim>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl pr-0" onMouseEnter={() => setOffsetClass('mr-12')}>
              關於課程
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-bgColorSecondary text-secondary-foreground mx-auto" asChild>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <ul className="grid w-[100px] gap-3 p-4">
                  <LinkWithAnim href="/course">預約課程</LinkWithAnim>
                  <LinkWithAnim href='/course-intro'>課程介紹</LinkWithAnim>
                  <LinkWithAnim href='/'>師資介紹</LinkWithAnim>
                </ul>
              </motion.div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl p-0 ml-4 md:ml-0 md:pl-1" onMouseEnter={() => setOffsetClass('ml-[69px]')}>關於我們</NavigationMenuTrigger>
            < NavigationMenuContent className="bg-bgColorSecondary text-secondary-foreground" asChild>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <ul className="grid w-[100px] gap-3 p-4">
                  <LinkWithAnim href="/">教室環境</LinkWithAnim>
                  <LinkWithAnim href="/">空間理念</LinkWithAnim>
                  <LinkWithAnim href="/">聯絡資訊</LinkWithAnim>
                </ul>
              </motion.div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <LinkWithAnim href="/" className="text-xl">
              合作品牌
            </LinkWithAnim>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport className={`mx-auto mt-1 ${offsetClass} rounded-xl`} />
      </NavigationMenu >
    </>
  )
}
