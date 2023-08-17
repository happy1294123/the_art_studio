import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/page'
import Footer from '@/components/Footer'
import NprogressBar from '@/components/NprogressBar';
import localFont from 'next/font/local'
const LXGWWenKai = localFont({
  src: [
    {
      path: '../public/fonts/LXGWWenKai-Regular.ttf',
      weight: '400'
    },
    {
      path: '../public/fonts/LXGWWenKai-Bold.ttf',
      weight: '700'
    },
    {
      path: '../public/fonts/LXGWWenKai-Light.ttf',
      weight: '300'
    }
  ],
  variable: '--font-LXGWWenKai'
})

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: '媞藝術空間',
  description: '媞藝術空間官方網站 ｜ 瑜珈 ｜ 空中瑜伽 ｜ 預約課程 ｜ 合作品牌 ｜ 師資介紹',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <body className={`${LXGWWenKai.variable} font-sans`}>
        <div className='container'>
          <Navbar />
          <main className="my-6">{children}</main>
        </div>
        <Footer />
      </body>
    </html >
  )
}
