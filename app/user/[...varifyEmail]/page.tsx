import UpdateSession from "@/components/user/UpdateSession"
import varifyEmail from "@/lib/varifyEmail"

export default async function VarifyEmail({
  params,
  searchParams
}: {
  params: { varifyEmail: string },
  searchParams: { [key: string]: string }
}) {

  const email = decodeURIComponent(params.varifyEmail)
  const hash = searchParams?.hash
  const isSuccess = await varifyEmail(email, hash)

  return (
    <div>{isSuccess ? <div className="flex-center items-center" style={{ height: `calc(100vh - 200px)` }}>
      <div className="bg-bgColorOther rounded-3xl md:p-8 p-7">
        <div className="grid place-content-center text-headingColor text-3xl text-center">
          <span>恭喜您</span>
          完成會員註冊
        </div>
        <UpdateSession />
      </div>
    </div> : <>
      <div className="grid place-content-center text-headingColor text-3xl text-center">
        <span>驗證失敗</span>
        請聯絡官方
      </div>
      {/* <Button className="flex-center mt-3 mx-auto">個人頁面</Button> */}
    </>
    }</div >
  )
}