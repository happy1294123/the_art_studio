import { transporter, mailOptions } from '@/lib/transporter'
import resetPwdTemplate from '@/mailTemplate/resetPwd.html'
import { hashSync } from "bcryptjs";

export default async function sendVarifyMail(email: string) {
  console.log('準備發送信件')
  const hash = hashSync(`${email}_the-art-studio`, 10)
  const dateTime = (new Date()).getTime()
  const replaceUrl = `${process.env.NEXT_PUBLIC_HOST}/user/forgetPwd/${encodeURIComponent(email)}/${encodeURIComponent(hash)}/${encodeURIComponent(dateTime)}`

  const res = await transporter.sendMail({
    ...mailOptions,
    to: email,
    subject: '【媞藝術空間】重置密碼',
    html: resetPwdTemplate.replace('https://varify/callback', replaceUrl)
  })
  if (res.accepted.length) {
    console.log('發送成功')
    return true
  }
  return false
}