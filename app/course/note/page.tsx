import TheTitle from "@/components/TheTitle"

export default function NotePage() {
  return (
    <div className="max-w-screen-md mx-auto">
      <TheTitle>上課須知</TheTitle>
      <div className="bg-bgColorOther p-8 rounded-[40px] mt-10 mb-5 md:text-xl">
        <div className="text-headingColor text-xl mb-3">開課停課標準</div>
        <p>
          本空間團體課程皆以小班制為主，預約2人以上，即可開班。
          每堂課程預約未滿2人，則暫停開課。
        </p>
      </div>
      <div className="bg-bgColorOther p-8 rounded-[40px] mb-5 md:text-xl">
        <div className="text-headingColor text-xl mb-3">服裝穿著</div>
        <p>
          建議穿著舒適不過於寬鬆的長褲或運動服裝，嚴禁尖銳飾品。
        </p>
      </div>
      <div className="bg-bgColorOther p-8 rounded-[40px] mb-5 md:text-xl">
        <div className="text-headingColor text-xl mb-3">身體不適者</div>
        <p>
          有任何不適狀況或疾病，請事先或當下通知老師。
          以下情況，若想進行空中瑜珈，請先詢問醫師！
          「孕婦 眼部疾病 近期眼部開刀 腦部疾病患者 心血管疾病 高低血壓 骨骼相關疾病 暈眩症患者」
        </p>
      </div>
      <div className="bg-bgColorOther p-8 rounded-[40px] mb-5 md:text-xl">
        <div className="text-headingColor text-xl mb-3">服裝穿著</div>
        <p>
          建議穿著舒適不過於寬鬆的長褲或運動服裝，嚴禁尖銳飾品。
        </p>
      </div>
      <div className="bg-bgColorOther p-8 rounded-[40px] mb-5 md:text-xl">
        <div className="text-headingColor text-xl mb-3">瑜伽墊</div>
        <p>
          本空間會提供瑜伽墊，也可以自備瑜伽墊。
        </p>
      </div>
      <div className="bg-bgColorOther p-8 rounded-[40px] mb-12 md:text-xl">
        <div className="text-headingColor text-xl mb-3">遲到學員</div>
        <p>
          為確保學員每堂課程都享有完整暖身，預防身體受傷之狀況，遲到10分鐘者則無法入內上課，並扣課一堂。
        </p>
      </div>
      <TheTitle>取消規範</TheTitle>
      <div className="bg-bgColorOther p-8 rounded-[40px] mt-8 mb-10 md:text-xl">
        <ul className="grid space-y-5">
          <li>- 開課<span className="text-primary">24小時前</span>取消預約 歸還堂數</li>
          <li>- 開課<span className="text-primary">3小時前</span>僅可更改預約時段（限一週內課程，由官方提供）若無法配合更改時段 需扣課一堂</li>
          <li>- 開課前<span className="text-primary">3小時至開課後</span>需扣課一堂</li>
          <li>- 特殊原因請提出證明，如不可抗力因素例如：懷孕、受傷、開刀、⋯等等
            須經官方同意且完成課程延期或取消程序，否則不可取消及延期課程使用效期</li>
          <li>- 若逢國定假日、颱風、天災等不可抗力因素，比照新北市政府停班政策</li>
        </ul>
      </div>
    </div>
  )
}
