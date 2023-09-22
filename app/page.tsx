import TheTitle from '@/components/TheTitle'
import TestReplace from '@/components/TestReplace'

export default async function Home() {
  return (
    <>
      <TheTitle>主頁</TheTitle>
      <TestReplace />
      {/* <TestMotion /> */}
      {/* {process.env.HOST} */}
    </>
  )
}
