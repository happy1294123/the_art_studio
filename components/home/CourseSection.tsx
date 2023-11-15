import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import BorderWithCorner from "./BorderWithCorner"
import { motion } from "framer-motion"

type Props = {
  activeAnimate: Boolean
}

export default function CourseSection({ activeAnimate }: Props) {
  return (
    <div className="flex justify-center">
      <div className="relative md:mt-20" >
        <Image className="ml-6 -mb-[160px] w-[200px] md:w-[300px]" src="/home/course_section/course_intro_title.svg" width={300} height={300} alt="title" />
        <Image className="ml-[200px] -mb-[300px] md:hidden " src="/home/course_section/img2.svg" width={180} height={180} alt="img" />
        <div className="border-b border-[#B2B2B2] -mb-[0px] ml-8 w-[180px] md:w-[420px] rotate-[-192deg]"></div>
        <BorderWithCorner className="rotate-180" />
        <motion.p
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          whileInView={{ opacity: activeAnimate ? 1 : 0, filter: 'blur(0px)' }}
          transition={{
            delay: 0.3,
            duration: 0.5
          }}
          className="absolute -mt-[140px] md:-mt-[100px] ml-5 md:ml-14 w-[210px] md:w-[420px] tracking-wider md:text-lg "
        >
          課程介紹內文課程介紹內文課程介紹內文課程介紹內文課程介紹內文課程介紹內文課程介紹內文
        </motion.p>
        <div>
          <motion.div
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            whileInView={{ opacity: activeAnimate ? 1 : 0, filter: 'blur(0px)' }}
            transition={{
              delay: 0.6,
              duration: 0.5
            }}
            className="mt-[30px] mr-10 float-right"
          >
            <Button asChild className="text-lg md:text-xl h-8 md:h-10 px-4 z-50">
              <Link href="/course">
                預約課程
              </Link>
            </Button>
            <Button variant="link" asChild className="md:text-lg h-10 px-4 absolute whitespace-nowrap -ml-[60px] md:-ml-[80px] mt-7 md:mt-10 underline ">
              <Link href="/course/introduction">
                了解更多
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="hidden md:block -mx-[50px]">
        {/* <Image src="/home/course_section/img.svg" width={550} height={550} alt="img" /> */}
        <Image src="/home/course_section/img2.svg" width={250} height={250} alt="img" />
      </div>
    </div >
  )
}