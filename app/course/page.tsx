import makeSleep from '@/lib/makeSleep'

export default async function Course() {
  // await new Promise(() => setTimeout(() => { }, 3000))
  // await setTimeout(() => { }, 3000)
  const re: Promise<Todo> = makeSleep()
  const data = await re
  // const data = await re


  return (
    <div>this is course {JSON.stringify(data)}</div>
  )
}
