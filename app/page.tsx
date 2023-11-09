import Image from "next/image"
import style from './homeStyle.module.scss'
import CourseSection from "@/components/home/CourseSection"
import DownArrow from "@/components/home/DownArrow"
import TeacherSection from "@/components/home/TeacherSection"
import BrandSection from "@/components/home/BrandSection"

export default function Home() {
  return (
    <div>
      <div className={`w-full h-[760px] absolute top-0 left-0 -z-10 ${style.bg}`}>
        {/* bg-[#ECF2F2]  */}
      </div>
      <div className="grid grid-cols-2 mt-[120px]">
        <div className="col-span-1 text-2xl md:text-3xl whitespace-nowrap text-center leading-8 tracking-widest text-[#789759] md:mr-[150px]">
          <Image className="mx-auto mb-3 drop-shadow-lg md:invisible" src="/logo.svg" width={60} height={60} alt="" priority />
          <div className="ml-5">瑜伽 放鬆伸展</div>
          <div>身體訓練 舒緩釋放</div>
        </div>
      </div>
      <div className="absolute top-0 right-10 md:left-[380px] -z-10">
        <Image src="/hero_img.png" width={250} height={250} alt='' />
      </div>
      <div className="flex-center mt-[30px] md:mt-0">
        <DownArrow />
      </div>

      <div className="flex-center mt-[250px] md:mt-[150px] relative">
        <div>
          <div className="absolute -top-[100px] md:-top-[30px]" id="start"></div>
          <CourseSection />
          <Image className="rotate-[340deg] ml-4 md:-ml-[50px]" src="/home/course_section/S__5988398.svg" width={130} height={130} alt="decorate" />
          <TeacherSection />
          <BrandSection />
        </div>
      </div>
    </div>
  )
}