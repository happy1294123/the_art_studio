
'use client'
import Image from "next/image"
import style from './homeStyle.module.scss'
import CourseSection from "@/components/home/CourseSection"
import DownArrow from "@/components/home/DownArrow"
import TeacherSection from "@/components/home/TeacherSection"
import BrandSection from "@/components/home/BrandSection"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import Link from "next/link"

export default function Home() {
  const [activeAnimate, setActiveAnimate] = useState(false)

  return (
    <div>
      <div className={`w-full h-[760px] absolute top-0 left-0 -z-10 ${style.bg}`}></div>
      <div className="flex items-center justify-center md:justify-start gap-0 md:gap-10 -mt-[84px] ml-2 md:ml-[100px] ">
        <div className="md:left-[200px]">
          {/* -mr-[150px] */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: [0, 0.5, 0.8, 1],
            }}
            className="text-2xl md:text-3xl whitespace-nowrap text-center leading-8 tracking-widest text-[#789759] -mt-[180px] mr-10"
          >
            <Link href="/">
              <Image className="mx-auto mb-3 drop-shadow-lg" src="/logo.svg" width={60} height={60} alt="" priority />
            </Link>
            <div className="mb-1">瑜伽 放鬆伸展</div>
            <div>身體訓練 舒緩釋放</div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
          }}
          className="top-0 right-10 -z-10 -ml-[150px] md:left-[380px] "
        >
          <Image src="/hero_img.png" width={250} height={250} alt='' />
        </motion.div>
      </div>
      <div className="flex-center -mt-[320px] md:-mt-[400px]">
        <DownArrow />
      </div>

      <div className="flex-center mt-[250px] md:mt-[150px] relative">
        <div>
          <div className="absolute -top-[100px] md:-top-[30px]" id="start"></div>
          <ScrollShowAnimate setActiveAnimate={setActiveAnimate}>
            <CourseSection activeAnimate={activeAnimate} />
          </ScrollShowAnimate>
          <Image className="rotate-[340deg] ml-4 md:-ml-[50px]" src="/home/course_section/S__5988398.svg" width={130} height={130} alt="decorate" />
          <ScrollShowAnimate>
            <TeacherSection />
          </ScrollShowAnimate>
          <ScrollShowAnimate>
            <BrandSection />
          </ScrollShowAnimate>
        </div>
      </div>
    </div >
  )
}


const ScrollShowAnimate = ({
  children,
  className,
  setActiveAnimate
}: {
  children: React.ReactNode,
  className?: string,
  setActiveAnimate?: Dispatch<SetStateAction<boolean>>
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0 0.5"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.8 && setActiveAnimate) {
      setActiveAnimate(true)
    }
  })

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scrollYProgress,
        opacity: scrollYProgress
      }}
      className={className}
    >
      {children}
    </motion.div>
  )

}