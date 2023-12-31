import useSWR from 'swr'
import GoogleReview from './GoogleReview';
import { Review } from '@/type';
import style from '@/components/course/datePicker/style.module.css'
import { AiOutlineToTop } from 'react-icons/ai'
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

async function reviewsFetcher(url: string): Promise<Review[]> {
  const res = await fetch(url)
  return await res.json()
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
    const step = 105
    if (derection === 'top') {
      intervalId = setInterval(() => {
        div.scroll({
          behavior: 'smooth',
          top: div.scrollTop - step
        })
      }, 100)
    } else if (derection === 'down') {
      intervalId = setInterval(() => {
        div.scroll({
          behavior: 'smooth',
          top: div.scrollTop + step
        })
      }, 100)
    }
  }

  const clearScroll = () => {
    clearInterval(intervalId)
  }

  const [windowWidth, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window?.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <div className="md:flex justify-center md:mt-10 md:-mb-[30px] bg-slate-">
        {(reviews && reviews?.length > 0) && (
          <div className='my-6 md:-mt-8 relative flex md:flex-col items-center'>
            <div
              className='invisible md:visible rotate-180 cursor-pointer'
              onMouseDown={() => handleScroll('top')}
              onMouseUp={clearScroll}
            >
              <IoIosArrowDown fontSize={24} />
            </div>
            <div className={`overflow-auto relative w-full md:w-[300px] -mx-4 md:mx-0 h-[254px] md:h-[450px] ${style.noScroll} rounded-3xl`} ref={ref}>
              <div className="flex md:flex-col gap-3 absolute">
                {reviews.map(review => (
                  <GoogleReview key={review.time} review={review} />
                ))}
                <div className='m-auto whitespace-nowrap bg-bgColorOther rounded-full px-2 p-3 cursor-pointer' onClick={handleMoreReviews}>
                  <a
                    href="https://www.google.com/maps/place/Th%C3%A9+Art+Studio+%E5%AA%9E%E8%97%9D%E8%A1%93%E7%A9%BA%E9%96%93%EF%BD%9C%E7%A9%BA%E4%B8%AD%E7%91%9C%E4%BC%BD+%E7%9A%AE%E6%8B%89%E6%8F%90%E6%96%AF+%E7%91%9C%E4%BC%BD+%E8%BA%AB%E9%AB%94%E9%9B%95%E5%A1%91+%E7%91%9C%E7%8F%88%E6%95%99%E5%AE%A4+%E7%A9%BA%E9%96%93%E7%A7%9F%E5%80%9F/@25.0077208,121.3410402,12z/data=!4m12!1m2!2m1!1z5aqe6Jed6KGT56m66ZaT!3m8!1s0x3442a99374035f43:0x76ba536f7e81081a!8m2!3d25.0077208!4d121.4728761!9m1!1b1!15sCg_lqp7ol53ooZPnqbrplpNaEyIR5aqeIOiXneihkyDnqbrplpOSAQt5b2dhX3N0dWRpb-ABAA!16s%2Fg%2F11sqj3x6qr?entry=ttu"
                    target='_blank'
                  >
                    更多
                  </a>
                </div>
              </div>
            </div>
            <div className='cursor-pointer invisible md:visible'
              onMouseDown={() => handleScroll('down')}
              onMouseUp={clearScroll}>
              <IoIosArrowDown fontSize={24} />
            </div>
          </div>
        )}
        <div className='mx-6 md:order-first'>
          <div className="flex-center w-fit mx-auto rounded-3xl overflow-hidden aspect-w-16 aspect-h-9 -ml-4 -mt-2">
            <iframe
              width={windowWidth > 768 ? 800 : windowWidth - 26}
              height={windowWidth > 768 ? 450 : windowWidth - 26}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}
                  &q=place_id:ChIJQ18DdJOpQjQRGgiBfm9TunY`}
            >
            </iframe>
          </div >
        </div>
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
