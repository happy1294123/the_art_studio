import { number } from "zod"
import { Payment, ReservationState, Reservation } from "@prisma/client"

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

type MyDate = {
  year: number,
  month: number, // start from 0
  date: number,
  day: number, // 星期一 == 1, 星期天 == 0
  hasCourse: boolean
}

type Teacher = {
  id: number,
  name: string,
  image: string
}

type Course = {
  id: number,
  name: string,
  type: string | null,
  date: string,
  start_time: string,
  end_time: string,
  teacher_id: number,
  Reservation: Reservation[],
  Payment: Payment[],
  total_rez: number,
  baseline_rez: number,
  point: number,
  price: number,
  createdAt?: Date,
  updatedAt?: Date,
  teacher: Teacher
}

type Option = {
  label: string,
  value: string
}

type Session = {
  user: {
    id: number,
    name: string,
    email: string,
    image: string,
    role: string,
    point: number,
    schedule_service: string,
  }
}

type Reservation = {
  course_id: number,
  user_id: number,
  state: 'SUCCESS' | 'PENDING' | 'CANCEL',
  plan_name: string,
  plan_value: number,
  created_at: Date,
  updated_at: Date,
  course: Course
}

type CourseEvent = {
  title: string,
  courseId: number,
  date: string,
  start: string,
  end: string,
  color: string,
  textColor: string
}

type CreateCourse = {
  name: string,
  type: string,
  date: string,
  start_time: string,
  end_time: string,
  teacher_id: number,
  total_rez: number,
  baseline_rez: number,
  point: number,
  price: number,
}

type Discount = {
  id: number,
  code: string,
  description: string,
  point_discount: string,
  price_discount: string,
  active: boolean,
}

type Review = {
  author_name: string,
  author_url: string,
  language: string,
  original_language: string,
  profile_photo_url: string,
  rating: number,
  relative_time_description: string,
  text: string,
  time: number,
  translated: boolean
}