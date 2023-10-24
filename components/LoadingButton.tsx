import { Button } from '@/components/ui/button'
import { MouseEventHandler } from 'react'
import RingLoader from 'react-spinners/RingLoader'

type Props = {
  className: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  isLoading: boolean,
  children: React.ReactNode,
  disabledWhileLoading?: boolean
}

export default function LoadingButton({ className, onClick, isLoading, children, disabledWhileLoading }: Props) {
  return (
    <Button className={className} onClick={onClick} disabled={disabledWhileLoading && isLoading}>
      <span className={`${isLoading && 'hidden'}`}>{children}</span>
      <RingLoader speedMultiplier={1.5} size={25} color="#FFF" loading={isLoading} />
    </Button>
  )
}
