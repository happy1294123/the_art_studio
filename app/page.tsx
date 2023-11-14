'use client'
import Image from "next/image"
import style from './homeStyle.module.scss'
import CourseSection from "@/components/home/CourseSection"
import DownArrow from "@/components/home/DownArrow"
import TeacherSection from "@/components/home/TeacherSection"
import BrandSection from "@/components/home/BrandSection"
import { motion, useScroll } from "framer-motion"
import { useRef } from "react"

export default function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"]
  })

  return (
    <div>
      <div className={`w-full h-[760px] absolute top-0 left-0 -z-10 ${style.bg}`}>
      </div>
      <div className="absolute md:left-[200px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: [0, 0.5, 0.8, 1],
          }}
          className="text-2xl md:text-3xl whitespace-nowrap text-center leading-8 tracking-widest text-[#789759] -mt-[180px] md:-mt-[120px] "
        >
          <Image className="mx-auto mb-3 drop-shadow-lg md:invisible" src="/logo.svg" width={60} height={60} alt="" priority />
          <div className="ml-5">瑜伽 放鬆伸展</div>
          <div>身體訓練 舒緩釋放</div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.5,
        }}
        className="top-0 right-10 -z-10 md:left-[380px] absolute"
      >
        <Image src="/hero_img.png" width={250} height={250} alt='' />
      </motion.div>
      <div className="flex-center mt-[310px] md:mt-[200px]">
        <DownArrow />
      </div>

      <div className="flex-center mt-[250px] md:mt-[150px] relative">
        <div>
          <div className="absolute -top-[100px] md:-top-[30px]" id="start"></div>
          <motion.div
            ref={ref}
            style={{
              scale: scrollYProgress,
              opacity: scrollYProgress
            }}
          >
            <CourseSection />
            <Image className="rotate-[340deg] ml-4 md:-ml-[50px]" src="/home/course_section/S__5988398.svg" width={130} height={130} alt="decorate" />
          </motion.div>
          <TeacherSection />
          <BrandSection />
        </div>
      </div>
    </div>
  )
}