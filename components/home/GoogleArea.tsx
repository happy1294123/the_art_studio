import useSWR from 'swr'
import GoogleReview from './GoogleReview';
import { Review } from '@/type';
import style from '@/components/course/datePicker/style.module.css'
import { AiOutlineLeft } from 'react-icons/ai'
import { useRef } from 'react';

async function reviewsFetcher(url: string): Promise<Review[]> {
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export default function GoogleArea({ apiKey }: { apiKey: string }) {
  const { data: reviews } = useSWR(
    '/api/google/reviews',
    reviewsFetcher
  )

  const handleMoreReviews = (e: any) => {
    const div = e.target as HTMLDivElement
    const aTag = div.children[0] as HTMLLinkElement
    aTag?.click()
  }

  const ref = useRef(null)
  let intervalId: NodeJS.Timeout
  const handleScroll = (derection: string) => {
    if (!ref.current) return
    clearInterval(intervalId)
    const div = ref.current as HTMLDivElement
    const step = 100
    if (derection === 'right') {
      intervalId = setInterval(() => {
        div.scroll({
          behavior: 'smooth',
          left: div.scrollLeft + step
        })
      }, 100)
    } else if (derection === 'left') {
      intervalId = setInterval(() => {
        div.scroll({
          behavior: 'smooth',
          left: div.scrollLeft - step
        })
      }, 100)
    }
  }

  const clearScroll = () => {
    clearInterval(intervalId)
  }


  return (
    <>
      {(reviews && reviews?.length > 0) && (
        <div className='my-6 relative flex items-center'>
          <div
            onMouseDown={() => handleScroll('left')}
            onMouseUp={clearScroll}
          >
            <AiOutlineLeft fontSize={24} />
          </div>
          <div className={`overflow-auto relative w-full h-[282px] ${style.noScroll} ${'style.myGradient'} rounded-3xl`} ref={ref}>
            <div className="flex absolute">
              {reviews.map(review => (
                <GoogleReview key={review.time} review={review} />
              ))}
              <div className='my-auto whitespace-nowrap bg-bgColorOther rounded-full p-3 cursor-pointer' onClick={handleMoreReviews}>
                <a
                  href="https://www.google.com/maps/place/Th%C3%A9+Art+Studio+%E5%AA%9E%E8%97%9D%E8%A1%93%E7%A9%BA%E9%96%93%EF%BD%9C%E7%A9%BA%E4%B8%AD%E7%91%9C%E4%BC%BD+%E7%9A%AE%E6%8B%89%E6%8F%90%E6%96%AF+%E7%91%9C%E4%BC%BD+%E8%BA%AB%E9%AB%94%E9%9B%95%E5%A1%91+%E7%91%9C%E7%8F%88%E6%95%99%E5%AE%A4+%E7%A9%BA%E9%96%93%E7%A7%9F%E5%80%9F/@25.0077208,121.3410402,12z/data=!4m12!1m2!2m1!1z5aqe6Jed6KGT56m66ZaT!3m8!1s0x3442a99374035f43:0x76ba536f7e81081a!8m2!3d25.0077208!4d121.4728761!9m1!1b1!15sCg_lqp7ol53ooZPnqbrplpNaEyIR5aqeIOiXneihkyDnqbrplpOSAQt5b2dhX3N0dWRpb-ABAA!16s%2Fg%2F11sqj3x6qr?entry=ttu"
                  target='_blank'
                >
                  更多
                </a>
              </div>
            </div>
          </div>
          <div className='rotate-180' onMouseDown={() => handleScroll('right')} onMouseUp={clearScroll}>
            <AiOutlineLeft fontSize={24} />
          </div>
        </div>
      )}
      <div className='mx-6'>
        <div className="flex-center w-fit mx-auto rounded-3xl overflow-hidden">
          <iframe
            width="600"
            height="450"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}
        &q=ChIJQ18DdJOpQjQRGgiBfm9TunY235台灣新北市中和區中山路三段170巷8弄9號`}>
          </iframe>
        </div >
      </div>
      <div className="flex flex-col gap-2 text-[#321911] my-4 text-xl">
        <div className="mx-auto">
          ｜空間位置｜
        </div>
        <div className="mx-auto">
          新北市中和區中山路三段170巷8弄9號
        </div>
      </div>
    </>
  )
}
