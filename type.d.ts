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

type Course = {
  id: number,
  name: string,
  type: string | null,
  date: string,
  start_time: string,
  end_time: string,
  teacher_id: number,
  Reservation: {
    course_id: number,
    user_id: number,
    created_at: string
  }[],
  total_rez: number,
  baseline_rez: number,
  point: number,
  price: number,
  createdAt: Date,
  updatedAt: Date,
  teacher: {
    name: string,
    image: string
  }
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
    schedule_service: string
  }
}

type Reservation = {
  course_id: number,
  user_id: number,
  plan_name: string,
  plan_value: number,
  created_at: Date,
  updated_at: Date,
  course: Course
}