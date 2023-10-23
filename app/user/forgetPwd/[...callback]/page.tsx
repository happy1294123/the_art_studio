import { Button } from "@/components/ui/button"
import resetPwd from "@/lib/resetPwd"
import varifyEmail from "@/lib/varifyEmail"
import Link from "next/link"
import { BsArrowRightShort } from "react-icons/bs"

const checkIsAlive = (dateTime: string) => {
  const now = (new Date()).getTime()
  const delta = Math.abs(parseInt(dateTime) - now) / 36e5
  // console.log('delta', delta)
  // 少於兩小時
  return delta <= 2
}

export default async function ForgetPwdCallback({ params, searchParams }: { params: { callback: string }, searchParams: { [key: string]: string } }) {
  const isAlive = checkIsAlive(searchParams.dateTime)
  const email = decodeURIComponent(params.callback)
  const hash = searchParams.hash
  const isSuccess = await varifyEmail(email, hash)
  resetPwd(email)

  return (
    <>
      {isAlive ?
        <div>{isSuccess ? <>
          <div className="grid place-content-center text-headingColor text-3xl text-center">
            <span>您的密碼已經重置</span>
          </div>
          <div className="text-center mt-2">
            <p>重置後密碼為:</p>
            <p>12345678</p>
            <Link href='/login'>
              <Button className="my-2">登入頁面</Button>
            </Link>
            <p className="text-sm text-gray-400">請於登入後修改密碼</p>
            <div className="text-sm text-center mx-auto text-gray-400 flex justify-center -mb-2 ">
              可至
              <span className="flex mx-1 underline underline-offset-4">個人頁面
                <BsArrowRightShort className="my-auto" />修改密碼
              </span>
              修改密碼
            </div>
          </div>
          {/* <UpdateSession /> */}
        </> : <>
          <div className="grid place-content-center text-headingColor text-3xl text-center">
            <span>密碼重置失敗</span>
            請聯絡官方
          </div>
        </>}</div>
        : <div className="grid place-content-center text-headingColor text-3xl text-center">
          <span>此連結已經過期</span>
        </div>
      }</>
  )
}
