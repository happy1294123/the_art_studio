import TheTitle from '@/components/TheTitle'
import TestReplace from '@/components/TestReplace'
import createRandomCode from '@/lib/createRandomCode'

export default async function Home() {
  const code = createRandomCode()

  return (
    <>
      <TheTitle>主頁</TheTitle>
      <TestReplace />
      {code}
      {/* <TestMotion /> */}
      {/* {process.env.HOST} */}
    </>
  )
}
