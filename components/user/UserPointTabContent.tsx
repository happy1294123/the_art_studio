import { useSession } from 'next-auth/react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { options } from '@/app/api/auth/[...nextauth]/options'

const pointOptions = [
  { point: 35, price: 3200 },
  { point: 75, price: 6400 },
  { point: 150, price: 12200 },
  { point: 250, price: 18800 },
]

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

    {pointOptions.map(option => (
      <Card className='md:px-3 mb-2' key={option.price}>
        <CardHeader>
          <CardTitle className='md:flex -mb-2'>
            <span>
              {option.point}點
            </span>
            <span className='mt-auto ml-4 text-base '>NT$ {option.price}</span>
            <Button className='float-right -mt-1' >購買點數</Button>
          </CardTitle>
        </CardHeader>
      </Card>
    ))}

  </>)
}
