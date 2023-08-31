import { useState } from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function MdLinkGroup() {
  const [offsetClass, setOffsetClass] = useState('mr-5')

  return (
    <>
      <NavigationMenu className="opacity-70">
        <NavigationMenuList className="flex flex-col md:flex-row gap-2 md:gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className="text-xl ml-1 md:ml-0">
              最新消息
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl pr-0" onMouseEnter={() => setOffsetClass('mr-11')}>關於課程</NavigationMenuTrigger>
            < NavigationMenuContent className="bg-bgColorSecondary text-secondary-foreground mx-auto">
              <ul className="grid w-[100px] gap-3 p-4">
                <NavigationMenuLink href="/course">預約課程</NavigationMenuLink>
                <NavigationMenuLink href="/course-intro">課程介紹</NavigationMenuLink>
                <NavigationMenuLink href="/">師資介紹</NavigationMenuLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl p-0 ml-4 md:ml-0 md:pl-1" onMouseEnter={() => setOffsetClass('ml-[62px]')}>關於我們</NavigationMenuTrigger>
            < NavigationMenuContent className="bg-bgColorSecondary text-secondary-foreground">
              <ul className="grid w-[100px] gap-3 p-4">
                <NavigationMenuLink href="/">教室環境</NavigationMenuLink>
                <NavigationMenuLink href="/">空間理念</NavigationMenuLink>
                <NavigationMenuLink href="/">聯絡資訊</NavigationMenuLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className="text-xl">
              合作品牌
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport className={`mx-auto mt-1 ${offsetClass} rounded-xl`} />
      </NavigationMenu >
    </>
  )
}
