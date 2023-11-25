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
import LoginBtnOrUserProfile from '@/components/Navbar/LoginBtnOrUserProfile'
import ManageLink from './ManageLink';

type Props = {
  isLogin: boolean,
  isManager: boolean | null,
  isTeacher: boolean | null
}

export default function MdLinkGroup({ isLogin, isManager, isTeacher }: Props) {
  const [offsetClass, setOffsetClass] = useState('')

  return (
    <>
      <NavigationMenu className="opacity-70 whitespace-nowrap">
        <NavigationMenuList className="flex flex-col md:flex-row gap-2 md:gap-4">
          <NavigationMenuItem className="data-[highlighted]:bg-red-400">
            <LinkWithAnim href="/news" className="text-xl ml-1 md:ml-0">最新消息</LinkWithAnim>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl pr-0" onMouseEnter={() => setOffsetClass((isManager || isTeacher) ? 'mr-[150px]' : 'mr-[100px]')}>
              <span>關於課程</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-bgColorSecondary text-secondary-foreground mx-auto" asChild>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <ul className="grid w-[100px] gap-3 p-4">
                  <LinkWithAnim href="/course" shortUnderline={true}>預約課程</LinkWithAnim>
                  <LinkWithAnim href='/course/introduction' shortUnderline={true}>課程介紹</LinkWithAnim>
                  <LinkWithAnim href='/course/teacher' shortUnderline={true}>師資介紹</LinkWithAnim>
                  <LinkWithAnim href='/course/note' shortUnderline={true}>上課須知</LinkWithAnim>
                </ul>
              </motion.div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl p-0 ml-4 md:ml-0 md:pl-1" onMouseEnter={() => setOffsetClass((isManager || isTeacher) ? 'mr-[30px]' : 'ml-[20px]')}>
              關於我們
            </NavigationMenuTrigger>
            < NavigationMenuContent className="bg-bgColorSecondary text-secondary-foreground" asChild>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <ul className="grid w-[100px] gap-3 p-4">
                  <LinkWithAnim href="/classroom" shortUnderline={true}>教室環境</LinkWithAnim>
                  <LinkWithAnim href="/idea" shortUnderline={true}>空間理念</LinkWithAnim>
                  <LinkWithAnim href="/contact" shortUnderline={true}>聯絡資訊</LinkWithAnim>
                </ul>
              </motion.div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <LinkWithAnim href="/cooperation" className="text-xl">
              合作品牌
            </LinkWithAnim>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <LoginBtnOrUserProfile isLogin={isLogin} />
          </NavigationMenuItem>
          {isManager && (
            <NavigationMenuItem>
              <ManageLink />
            </NavigationMenuItem>
          )}
          {isTeacher && (
            <NavigationMenuItem>
              <LinkWithAnim href='/teacher' className="text-md md:text-xl ml-6 md:ml-0 mb-2 md:mb-0">
                老師專區
              </LinkWithAnim >
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
        <NavigationMenuViewport className={`mx-auto mt-1 ${offsetClass} rounded-xl`} />
      </NavigationMenu >
    </>
  )
}
