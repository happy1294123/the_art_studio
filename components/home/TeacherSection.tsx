import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function TeacherSection() {
  return (
    <>
      <div className="mt-[80px]">
        <div className="flex gap-2">
          <Image className="-mt-[100px] md:-mt-[200px] w-[150px] md:w-[250px]" src="/home/teacher_section/img.svg" width={300} height={300} alt="img" />
          <div className="flex flex-col -mr-6 md:ml-16" style={{ width: '300px' }}>
            <Image className="" src="/home/teacher_section/title.svg" width={300} height={300} alt="title" />
            <Image className="-mt-8 md:-mt-16 mr-10" src="/home/teacher_section/decorate.svg" width={350} height={350} alt="decorate" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{
            delay: 0.3,
            duration: 0.5
          }}
          className="absolute w-[300px] md:w-[400px] -mt-3 md:-mt-14 md:ml-[130px] text-center md:text-lg tracking-widest space-y-2"
        >
          <div>關於我們的溫度、專業與精緻</div>
          <div>毫無保留的提供給您。</div>
        </motion.div>
      </div >
      <div className="flex justify-end mt-[120px]">
        <Image className="mr-auto -ml-10 -mt-[50px]" src="/home/teacher_section/img2.svg" width={200} height={200} alt="mg2" />
        <Button variant='secondary' className="text-lg md:text-2xl h-8 md:h-10 px-4 mr-10 z-20" asChild>
          <motion.div
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{
              delay: 0.6,
              duration: 0.5
            }}
          >
            <Link href="/course/teacher">
              師資一覽
            </Link>
          </motion.div>
        </Button>
      </div>
      <div className="relative">
        <div className="-mt-[380px] md:-mt-[500px] -mr-2 border-r border-[#B2B2B2] h-[180px] md:h-[300px]"></div>
        <div className="absolute right-0 -mt-[17px] -mr-[14px] border-r border-[#B2B2B2] h-[20px] rotate-[37deg]"></div>
      </div>
      <div className="-mt-4 -mr-5 border-t border-[#B2B2B2] w-[180px] md:w-[300px] ml-auto"></div>
      <motion.div
        initial={{ x: '20%', opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{
          delay: 0.6,
          duration: 0.5
        }}
        className="mt-4 ml-auto mr-[45px] border-t border-[#B2B2B2] w-[150px] md:w-[350px]"></motion.div>
    </ >
  )
}
