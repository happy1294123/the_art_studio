import TheTitle from "@/components/TheTitle"

export default function NotePage() {
  return (
    <div className="max-w-screen-md mx-auto">
      <TheTitle>上課須知</TheTitle>
      <div className="bg-bgColorOther p-8 rounded-[40px] mt-10 mb-5">
        <div className="text-headingColor text-xl mb-3">開課停課標準</div>
        <p>
          本空間團體課程皆以小班制為主，預約2人以上，即可開班。
          每堂課程預約未滿2人，則暫停開課。
        </p>
      </div>
      <div className="bg-bgColorOther p-8 rounded-[40px] mb-5">
        <div className="text-headingColor text-xl mb-3">服裝穿著</div>
        <p>
          建議穿著舒適不過於寬鬆的長褲或運動服裝，嚴禁尖銳飾品。
        </p>
      </div>
      <div className="bg-bgColorOther p-8 rounded-[40px] mb-5">
        <div className="text-headingColor text-xl mb-3">身體不適者</div>
        <p>
          有任何不適狀況或疾病，請事先或當下通知老師。
          以下情況，若想進行空中瑜珈，請先詢問醫師！
          「孕婦 眼部疾病 近期眼部開刀 腦部疾病患者 心血管疾病 高低血壓 骨骼相關疾病 暈眩症患者」
        </p>
      </div>
      <div className="bg-bgColorOther p-8 rounded-[40px] mb-5">
        <div className="text-headingColor text-xl mb-3">服裝穿著</div>
        <p>
          建議穿著舒適不過於寬鬆的長褲或運動服裝，嚴禁尖銳飾品。
        </p>
      </div>
      <div className="bg-bgColorOther p-8 rounded-[40px] mb-5">
        <div className="text-headingColor text-xl mb-3">瑜伽墊</div>
        <p>
          本空間會提供瑜伽墊，也可以自備瑜伽墊。
        </p>
      </div>
      <div className="bg-bgColorOther p-8 rounded-[40px] mb-12">
        <div className="text-headingColor text-xl mb-3">遲到學員</div>
        <p>
          為確保學員每堂課程都享有完整暖身，預防身體受傷之狀況，遲到10分鐘者則無法入內上課，並扣課一堂。
        </p>
      </div>
    </div>
  )
}
