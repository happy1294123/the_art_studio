export default function GoogleArea() {
  // TODO get reviews data
  // GET
  // https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews
  return (
    <>
      <div className="flex-center">
        <iframe
          width="600"
          height="450"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA7eFyuzKsFjgVye3LbpW5BjpdZ-XNVN24
        &q=Thé+Art+Studio+媞藝術空間｜空中瑜伽+皮拉提斯+瑜伽+身體雕塑+瑜珈教室+空間租借">
        </iframe>
      </div>
      <div className="flex flex-col gap-2 text-[#321911] my-4">
        <div className="mx-auto">
          ｜空間位置｜
        </div>
        <div className="mx-auto">
          新北市中和區中山路三段170巷8弄9號
        </div>
      </div>
    </>
  )
}
