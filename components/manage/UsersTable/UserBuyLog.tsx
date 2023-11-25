import { Accordion } from "@/components/ui/accordion"
import UserPointDetailItem from "@/components/user/UserPointDetailItem"
import { User } from "@prisma/client"
import { ClipLoader } from "react-spinners"
import useSWR from "swr"

type Props = {
  user: User
}

const fetcher = async (url: string): Promise<{ title: string, point: string, created_at: Date }[]> => {
  const res = await fetch(url)
  return await res.json()
}

export default function UserBuyLog({ user }: Props) {
  const { data: pointDetails } = useSWR(
    '/api/manage/users/point/detail?user_id=' + user.id,
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
              <UserPointDetailItem key={String(detail.created_at)} detail={detail} isManage />
            ))}
          </Accordion>)
          : <span className="flex-center">無點數明細</span>
      }
    </div>
  )
}
