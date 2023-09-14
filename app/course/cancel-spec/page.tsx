import TheTitle from "@/components/TheTitle"

export default function CancelSpecPage() {
  return (
    <div className="max-w-screen-md mx-auto">
      <TheTitle>取消規範</TheTitle>
      <div className="bg-bgColorOther p-8 rounded-[40px] mt-8 mb-5 md:text-xl">
        {/* <div className="text-headingColor text-xl mb-3">開課停課標準</div> */}
        <ul className="grid space-y-5">
          <li>- 開課<span className="text-primary">24小時前</span> 取消預約 歸還堂數</li>
          <li>- 開課<span className="text-primary">3小時前</span> 僅可更改預約時段（限一週內課程，由官方提供）若無法配合更改時段 需扣課一堂</li>
          <li>- 開課前<span className="text-primary">3小時至開課後</span> 需扣課一堂</li>
          <li>- 特殊原因請提出證明，如不可抗力因素例如：懷孕、受傷、開刀、⋯等等</li>
          <li>- 須經官方同意且完成課程延期或取消程序，否則不可取消及延期課程使用效期</li>
          <li>- 若逢國定假日、颱風、天災等不可抗力因素，比照新北市政府停班政策</li>
        </ul>
      </div>
    </div>
  )
}
