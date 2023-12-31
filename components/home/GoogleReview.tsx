import { Review } from "@/type"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { AiFillStar } from 'react-icons/ai'
import style from '@/app/homeStyle.module.scss'

type Props = {
  review: Review
}

export default function GoogleReview({ review }: Props) {
  return (
    <div className="bg-white rounded-3xl p-5 w-[300px]">
      <div className="flex">
        <Avatar>
          <AvatarImage src={review.profile_photo_url} alt="avatar" className="p-1" />
          <AvatarFallback>
            {review.author_name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <span className="mt-1 ml-2">
          {review.author_name}
        </span>
      </div>
      <div className="px-1">
        <div className="flex items-center">
          {Array(review.rating).fill(<AiFillStar color="#FBBC03" />)}
          <span className="text-sm ml-2 text-[#70757A]">
            {review.relative_time_description}
          </span>
        </div>
      </div>
      <div className={`${style.defaultScroller}`}>
        <div className="p-1 mt-1 h-[150px] overflow-y-auto">
          {review.text}
        </div>
      </div>
    </div>
  )
}
