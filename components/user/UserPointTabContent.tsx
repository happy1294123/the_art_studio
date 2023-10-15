import { useSession } from 'next-auth/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function UserPointTabContent() {
  const { data: session } = useSession()

  return (<>
    <Card className='mb-4'>
      <CardContent>
        <div className='text-center text-3xl -mb-4 mt-3'>
          <span className='text-headingColor'>
            剩餘點數
          </span>
          {session && <div>
            {session.user.point}
          </div>}
        </div>
      </CardContent>
    </Card>

    <Card className='px-3'>
      <CardHeader>
        <CardTitle className='flex'>
          <span className='my-auto'>
            100點
          </span>
          <span className='mt-auto ml-4 text-base '>NT$ 1000</span>
          <Button className='ml-auto'>購買點數</Button>
        </CardTitle>
      </CardHeader>
    </Card>
  </>)
}
