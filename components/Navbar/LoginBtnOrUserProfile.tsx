import { useSession } from "next-auth/react"
import LinkWithAnim from '@/components/Navbar/LinkWithAnim'
import { Button } from '@/components/ui/button'
import { MdOutlineLogin } from 'react-icons/md'

export default function LoginBtnOrUserProfile() {
  const { data: session } = useSession()
  const href = session ? '/user' : '/login'

  return (
    <LinkWithAnim href={href} className="text-md md:text-xl ml-6 md:ml-0">
      {session
        ? '個人頁面'
        : <Button variant="outline">登入 < MdOutlineLogin className="my-auto ml-1" /></Button>
      }
    </LinkWithAnim >
  )
}
