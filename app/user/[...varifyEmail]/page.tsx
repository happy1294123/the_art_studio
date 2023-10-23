'use client'
import UpdateSession from "@/components/user/UpdateSession"
import varifyEmail from "@/lib/varifyEmail"

// eslint-disable-next-line @next/next/no-async-client-component
export default async function VarifyEmail({ params }: { params: { varifyEmail: string[] } }) {
  const email = decodeURIComponent(params.varifyEmail[0])
  const hash = decodeURIComponent(params.varifyEmail[1])
  const isSuccess = await varifyEmail(email, hash)
  console.log('isSuccess', isSuccess);

  return (
    <div>{isSuccess ? <>
      <div className="grid place-content-center text-headingColor text-3xl text-center">
        <span>恭喜您</span>
        完成會員註冊
      </div>
      <UpdateSession />
    </> : <>
      <div className="grid place-content-center text-headingColor text-3xl text-center">
        <span>驗證失敗</span>
        請聯絡官方
      </div>
      {/* <Button className="flex-center mt-3 mx-auto">個人頁面</Button> */}
    </>}</div>
  )
}
