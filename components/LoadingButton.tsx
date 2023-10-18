import { Button } from '@/components/ui/button'
import { MouseEventHandler } from 'react'
import RingLoader from 'react-spinners/RingLoader'

type Props = {
  className: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  isLoading: boolean,
  children: React.ReactNode
}

export default function LoadingButton({ className, onClick, isLoading, children }: Props) {
  return (
    <Button className={className} onClick={onClick}>
      <span className={`${isLoading && 'hidden'}`}>{children}</span>
      <RingLoader speedMultiplier={1.5} size={25} color="#FFF" loading={isLoading} />
    </Button>
  )
}
