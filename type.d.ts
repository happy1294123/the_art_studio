// type Post = {
//   "id": number,
//   "title": string,
//   "price": number,
//   "description": string,
//   "category": string,
//   "image": string,
//   "rating": {
//     "rate": number,
//     "count": number
//   }
// }

type Todo = {
  "userId": number,
  "id": number,
  "title": string,
  "completed": boolean
}

type MyDate = {
  "year": number,
  "month": number, // start from 0
  "date": number,
  "day": number, // 星期一 == 1, 星期天 == 0
  "hasCourse": boolean
}

type Course = {
  id: number,
  name: string,
  type: string | null,
  date: string,
  start_time: string,
  end_time: string,
  teacher_id: number,
  // current_rez: number
  Reservation: {
    course_id: number,
    user_id: number,
    created_at: string
  }[],
  total_rez: number,
  createdAt: Date,
  updatedAt: Date,
  teacher: {
    name: string,
    image: string
  }
}

type Users = {
  "id": number | null,
  "name": string | null
}

type Option = {
  label: string,
  value: string
}