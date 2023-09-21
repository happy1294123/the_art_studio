import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/page'
import Footer from '@/components/Footer'
import localFont from 'next/font/local'
import AuthProvider from '@/context/AuthProvider'
import { Toaster } from 'react-hot-toast'

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
  openGraph: {
    title: 'OG標題',
    description: '媞藝術空間官方網站 ｜ 瑜珈 ｜ 空中瑜伽 ｜ 預約課程 ｜ 合作品牌 ｜ 師資介紹',
    images: {
      url: 'https://the-art-studio.vercel.app/logoBW.png',
      width: 300,
      height: 200
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <link rel='icon' href='/logo.svg' />
      </head>
      <body className={`${LXGWWenKai.variable} font-sans`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className='container flex-1'>
              <main className="my-6">
                {children}
              </main>
            </div>
            <Footer />
          </div>
          <Toaster toastOptions={{ duration: 3000 }} />
        </AuthProvider>
      </body>
    </html >
  )
}
