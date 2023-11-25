import UserPointDetailItem from "./UserPointDetailItem";
import { ClipLoader } from 'react-spinners'
import { Accordion } from "@/components/ui/accordion"
import useSWR from "swr";

const fetcher = async (url: string): Promise<{ title: string, point: string, created_at: Date }[]> => {
  const res = await fetch(url)
  return await res.json()
}

export default function UserPointDetail() {
  const { data: pointDetails } = useSWR(
    '/api/user/point/detail',
    fetcher
  )

  return (
    <div>
      {!pointDetails
        ? <div className="flex-center">
          <ClipLoader color="#D1C0AD" />
        </div>
        : pointDetails.length > 0
          ? (<Accordion type="multiple" >
            {pointDetails?.map(detail => (
              <UserPointDetailItem key={String(detail.created_at)} detail={detail} />
            ))}
          </Accordion>)
          : <span className="flex-center">無點數明細</span>
      }
    </div>
  )
}
