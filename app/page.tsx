// import TheTitle from '@/components/TheTitle'
// import TestReplace from '@/components/TestReplace'
// import EmailTemplate from '@/components/email/EmailTemplate'
// import createRandomCode from '@/lib/createRandomCode'
import { transporter, mailOptions } from '@/lib/transporter'
// import sendVarifyMail from '@/lib/sendVarifyMail'
// import varify from '@/mailTemplate/varify.html'
import { compareSync } from "bcryptjs"

export default async function Home() {
  // sendVarifyMail('test@example.com')
  // const code = createRandomCode()
  // const sm = async () => {
  //   console.log('send mail')
  //   // console.log(varify)

  //   const res = await transporter.sendMail({
  //     ...mailOptions,
  //     subject: '【媞藝術空間】註冊驗證信箱',
  //     html: varify.replace('https://varify/callback', 'www.google.com')
  //   })
  //   if (res.accepted.length) {
  //     console.log('發送成功')
  //   }
  // }

  // sm()
  const email = 'happy1294123@gmail.com'
  const a = '%242a%2410%24QeOtujN3T4gFJ%2FKd7xeufOtUw7CiMkYUBkJPbfMl3iGzCA8VIRMzG'
  // console.log(decodeURIComponent(a));

  const hash = decodeURIComponent(a)
  const res = compareSync(`${email}_the-art-studio`, hash)
  console.log(res);


  return (
    <>
      {/* test */}
      {/* {varify.replace('${html}', 'this is variable')} */}
      {/* <EmailTemplate /> */}
      {/* <TheTitle>主頁</TheTitle> */}
      {/* <TestReplace />
      {code} */}
      {/* <TestMotion /> */}
      {/* {process.env.HOST} */}
    </>
  )
}
