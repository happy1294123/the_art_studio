'use client'
import { Button } from "@/components/ui/button"
import { BiSolidError } from "react-icons/bi"

export default function error() {
  return (
    <div className="flex-center items-center" style={{ height: `calc(100vh - 200px)` }}>
      <div className="bg-bgColorOther rounded-3xl p-5 px-9">
        <div className="grid place-content-center text-headingColor text-xl text-center">
          <div className="flex-center">
            <BiSolidError color="947964" fontSize={40} />
          </div>
          <span className="mb-3">
            發生錯誤
          </span>
          <Button onClick={() => location.reload()}>重新整理</Button>
        </div>
      </div>
    </div>
  )
}
