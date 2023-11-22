import useSWR from "swr"

type CourseType = {
  id: number,
  name: string,
  color: string
}

const fetcher = async (url: string): Promise<CourseType[]> => {
  const res = await fetch(url, { cache: 'force-cache', next: { tags: ['courseType'] } })
  return await res.json()
}

export default function CourseTypeBadge({ name, className }: { name: string, className?: string }) {
  const { data: allType } = useSWR(
    '/api/course/type',
    fetcher
  )
  const backgroundColor = allType?.find(t => t.name === name)?.color || '#FFF5ED'

  return (
    <span
      className={`rounded-full px-2 border border-gray-400 ${className}`}
      style={{ backgroundColor }}
    >
      {name}
    </span>
  )
}
