import makeSleep from '@/lib/makeSleep'

// try async fetch
export default async function CourseIntro() {
  const re: Promise<Todo> = makeSleep()
  const data = await re

  return (
    <>
      <div>CourseIntro {JSON.stringify(data)}</div>
    </>
  )
}
