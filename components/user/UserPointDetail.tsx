import { useEffect, useState } from "react";
import UserPointDetailItem from "./UserPointDetailItem";
import { ClipLoader } from 'react-spinners'


export default function UserPointDetail() {
  const [pointDetails, setPointDetails] = useState<{ title: string, point: string, created_at: Date }[]>()

  useEffect(() => {
    (async function () {
      const res = await fetch('/api/user/point/detail')
      const data = await res.json()
      setPointDetails(data)
    })()
  }, [])

  return (
    <div>
      {!pointDetails
        ? <div className="flex-center">
          <ClipLoader color="#D1C0AD" />
        </div>
        : pointDetails.length > 0 ? pointDetails?.map(detail => (
          <UserPointDetailItem key={String(detail.created_at)} detail={detail} />
        )) : <span className="flex-center">無點數明細</span>
      }
    </div>
  )
}
