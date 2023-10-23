import { transporter, mailOptions } from '@/lib/transporter'
import varifyTemplate from '@/mailTemplate/varify.html'
import { hashSync } from "bcryptjs";

export default async function sendVarifyMail(email: string) {
  console.log('準備發送信件')
  const hash = hashSync(`${email}_the-art-studio`, 10)
  const replaceUrl = `${process.env.NEXT_PUBLIC_HOST}/user/${encodeURIComponent(email)}?hash=${hash}`

  const res = await transporter.sendMail({
    ...mailOptions,
    to: email,
    subject: '【媞藝術空間】註冊驗證信箱',
    html: varifyTemplate.replace('https://varify/callback', replaceUrl)
  })
  if (res.accepted.length) {
    console.log('發送成功')
    return true
  }
  return false

}