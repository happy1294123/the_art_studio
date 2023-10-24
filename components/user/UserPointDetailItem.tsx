import dateFormatter from '@/lib/dateFormatter'

type Props = {
  detail: { title: string, point: string, created_at: Date }
}

export default function UserPointDetailItem({ detail }: Props) {
  const dateString = dateFormatter(new Date(detail.created_at))

  return (
    <div className='bg-bgColorOther rounded-2xl mb-2 p-3 px-8 flex text-fontColor'>
      <div>
        {dateString.slice(5)}
        <span className='ml-5'>
          {detail.title}
        </span>
      </div>
      <div className='ml-auto'>
        <span className='tracking-widest'>
          {detail.point}點
        </span>
      </div>
    </div>
  )
}
