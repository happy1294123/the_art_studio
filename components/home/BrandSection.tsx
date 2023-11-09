import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"

export default function BrandSection() {
  return (
    <div className="mt-[150px]">
      <div className="flex justify-center ml-8">
        <Image className="" src="/home/brand_section/title.svg" width={300} height={300} alt="title" />
        <Image className="" src="/home/brand_section/img.svg" width={300} height={300} alt="img" />
      </div>
      <div className="md:text-lg md:ml-[100px]">
        <div className="tracking-widest">每個選擇，都會讓你的人生</div>
        <div className="tracking-widest mb-4">更接近想要的樣子。</div>
        <div className="tracking-widest">在生活中每一個角落增添儀式感</div>
        <div className="tracking-widest">享受每一個平凡且美好的日子。</div>
      </div>
      <div className="relative">
        <div className="-mt-[80px] md:-mt-[260px] border-r border-[#B2B2B2] h-[120px] md:h-[350px]"></div>
        <div className="absolute right-0 -mt-[17px] -mr-[7px] border-r border-[#B2B2B2] h-[20px] rotate-[37deg]"></div>
      </div>
      <div className="-mt-4 -mr-3 ml-auto border-t border-[#B2B2B2] w-[160px] md:w-[300px]"></div>
      <Button className="float-right mt-5 text-lg md:text-2xl h-8 md:h-10 px-4 mr-10 z-20" asChild>
        <Link href="/cooperation">
          瀏覽商品
        </Link>
      </Button>
      <div className="-mt-[20px] -ml-10">
        <Image src="/home/brand_section/decorate.svg" width={200} height={200} alt="decorate" />
      </div>
    </div>
  )
}