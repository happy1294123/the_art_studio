
export default function TableSection1() {
  return (
    <div className="relative mt-[200px] md:hidden" id="course" >
      <Image className="ml-6 -mb-[100px]" src="/home/section1/course_intro_title.svg" width={200} height={200} alt="title" />
      <Image className="ml-[130px] -mb-[250px]" src="/home/section1/img.svg" width={800} height={800} alt="img" />
      <Image className="-ml-5 -z-50" src="/home/section1/Vector 35.svg" width={20} height={20} alt="left line" />
      <Image className="ml-4 -mt-4" src="/home/section1/Vector 36.svg" width={300} height={300} alt="bottom line" />
      <Image className="-ml-4 -mt-[22px]" src="/home/section1/Vector 36.svg" width={300} height={300} alt="bottom line" />
      <p className="absolute -mt-[330px] ml-5 w-[230px] tracking-wider text-lg">
        課程介紹內文課程介紹內文課程介紹內文課程介紹內文課程介紹內文課程介紹內文課程介紹內文
      </p>
      <div>
        <div className="mt-[30px] mr-10 float-right">
          <Button asChild className="text-xl h-10 px-4 z-50">
            <Link href="/course">
              預約課程
            </Link>
          </Button>
          <Button variant="link" asChild className="text-lg h-10 px-4 absolute whitespace-nowrap -ml-[80px] mt-10 underline ">
            <Link href="/course/introduction">
              了解更多
            </Link>
          </Button>
        </div>
        <Image className="-mt-[130px]" src="/home/section1/S__5988398.svg" width={100} height={100} alt="decorate" />
      </div>
    </div>
  )
}
