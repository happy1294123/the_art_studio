import { FaInstagramSquare, FaFacebookSquare, FaLine } from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="bg-bgColorSecondary w-full p-1">
      <div className='flex justify-center gap-5 p-1'>
        <a href="https://www.instagram.com/the_art_studio.tw/">
          <FaInstagramSquare size={20} />
        </a>
        <a href="https://www.facebook.com/TheArtStudio2022/">
          <FaFacebookSquare size={21} />
        </a>
        <a href="https://line.me/ti/p/~@theartstudio">
          <FaLine size={21} />
        </a>
      </div>
      <span className="text-[10px] text-[#7E7E7E] flex justify-center">2023 ©  Thé Art Studio. All Rights Reserved.</span>
    </div>
  )
}
