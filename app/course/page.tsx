import OneLineDatePicker from '@/components/datePicker/OneLineDatePicker'
export default async function Course() {

  return (
    <>
      <div className="text-3xl text-fontColor font-bold">預約課程</div>
      <div className="my-4">
        <OneLineDatePicker />
      </div>
    </>
  )
}
