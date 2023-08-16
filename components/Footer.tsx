import Image from 'next/image'

export default function Footer() {
  return (
    <div className="bg-secondary w-full absolute bottom-0">
      <div className='flex justify-center gap-5 p-1'>
        <a href="https://www.instagram.com/the_art_studio.tw/"><Image src="/instagram.svg" width={19} height={19} alt="instagram" className='pt-0.5' /></a>
        <a href="https://www.facebook.com/TheArtStudio2022/"><Image src="/facebook.svg" width={20} height={20} alt="facebook" className='pt-0.5' /></a>
        <a href="https://line.me/ti/p/~@theartstudio"><Image src="/line.svg" width={24} height={24} alt="line" /></a>
      </div>
      <span className="text-[10px] text-fontColor flex justify-center">2023 ©  Thé Art Studio. All Rights Reserved.</span>
    </div>
  )
}
