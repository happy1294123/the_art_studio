import './globals.css'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import localFont from 'next/font/local'
import AuthProvider from '@/context/AuthProvider'
import { Toaster } from 'react-hot-toast'
import dynamic from 'next/dynamic'

const Navbar = dynamic(
  () => import('@/components/Navbar/page'),
  { ssr: false }
)

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
    title: '媞藝術空間',
    description: '媞藝術空間官方網站 ｜ 瑜珈 ｜ 空中瑜伽 ｜ 預約課程 ｜ 合作品牌 ｜ 師資介紹',
    images: [{
      url: 'https://the-art-studio.vercel.app/logoBW.png',
      width: 168,
      height: 168,
      type: 'image/png'
    }],
    type: 'website',
    url: 'https://the-art-studio.vercel.app/course'
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
          <Toaster toastOptions={{ duration: 5000 }} />
        </AuthProvider>
      </body>
    </html >
  )
}
