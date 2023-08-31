import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const data = [
    {
      "id": 1,
      "name": '中階瑜伽',
      "type": {
        "name": '地面瑜伽',
        "color": 'blue'
      },
      "date": '2023/9/1',
      "time": '12:00 ~ 13:00',
      "teacher_image": "/anonymous.svg",
      "teacher": 'Lily老師',
      "reservations": 1,
      "total_reservations": 4
    },
    {
      "id": 2,
      "name": '中階瑜伽',
      "type": {
        "name": '地面瑜伽',
        "color": 'blue'
      },
      "date": '2023/9/1',
      "time": '14:00 ~ 15:00',
      "teacher_image": "/anonymous.svg",
      "teacher": 'Lisa老師',
      "reservations": 4,
      "total_reservations": 4
    },
    {
      "id": 3,
      "name": '初階瑜伽',
      "type": {
        "name": '空中瑜伽',
        "color": 'red'
      },
      "date": '2023/9/5',
      "time": '13:00 ~ 14:00',
      "teacher_image": "/anonymous.svg",
      "teacher": 'Abby老師',
      "reservations": 2,
      "total_reservations": 4
    },
    {
      "id": 4,
      "name": '初階瑜伽',
      "type": {
        "name": '空中瑜伽',
        "color": 'red'
      },
      "date": '2023/9/10',
      "time": '13:00 ~ 14:00',
      "teacher_image": "/anonymous.svg",
      "teacher": 'Abby老師',
      "reservations": 2,
      "total_reservations": 4
    },
    {
      "id": 5,
      "name": '中階瑜伽',
      "type": {
        "name": '地面瑜伽',
        "color": 'blue'
      },
      "date": '2023/9/1',
      "time": '12:00 ~ 13:00',
      "teacher_image": "/anonymous.svg",
      "teacher": 'Lily老師',
      "reservations": 1,
      "total_reservations": 4
    },
  ]

  return NextResponse.json(data)
}
