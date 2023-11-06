type Props = {
  className?: string
  isReverse?: boolean
}

export default function BorderWithCorner({ className, isReverse }: Props) {
  return (
    <>
      <div className={`border-b border-[#B2B2B2] -mb-[33px] w-[200px] md:w-[500px] -ml-4 z-20 ${isReverse && 'hidden'}`}></div>
      <div
        className={`border-l border-[#B2B2B2] h-[330px] flex flex-col ${className}`}
        style={{ transform: `${isReverse ?? 'scaleY(-1)'}` }}
      >

        <div className="mt-auto mb-4">
          <div className="border-b border-[#B2B2B2] -ml-7 w-[38px] rotate-[63deg]"></div>
        </div>
      </div>
    </>
  )
}
