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
}

type Course = {
  "id": number,
  "name": string,
  "type": {
    "name": string,
    "color": string
  },
  "date": string,
  "time": string,
  "teacher": string,
  "teacher_image": string,
  "total_reservations": number
  "reservations": number
}

type Users = {
  "id": number | null,
  "name": string | null
}