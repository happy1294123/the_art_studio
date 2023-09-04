module.exports = [
  {
    name: '皮拉提斯',
    type: '空中課程',
    date: '2023/09/04',
    start_time: '10:00',
    end_time: '11:00',
    teacherId: 1,
    current_rez: 2,
    total_rez: 4,
  },
  {
    name: '初階空瑜',
    type: '空中課程',
    date: '2023/09/04',
    start_time: '11:30',
    end_time: '12:30',
    teacherId: 2,
    current_rez: 3,
    total_rez: 4,
  },
  {
    name: '柔軟度開發',
    type: '新開課程',
    date: '2023/09/04',
    start_time: '14:30',
    end_time: '15:30',
    teacherId: 3,
    current_rez: 4,
    total_rez: 4,
  },
  {
    name: '入門瑜珈',
    type: '空中課程',
    date: '2023/09/04',
    start_time: '15:40',
    end_time: '16:40',
    teacherId: 3,
    current_rez: 4,
    total_rez: 4,
  },
  {
    name: '初階空瑜',
    type: '空中課程',
    date: '2023/09/05',
    start_time: '10:30',
    end_time: '11:30',
    teacherId: 1,
    current_rez: 0,
    total_rez: 4,
  },
  {
    name: '皮拉提斯',
    type: '地面課程',
    date: '2023/09/05',
    start_time: '11:40',
    end_time: '12:40',
    teacherId: 1,
    current_rez: 4,
    total_rez: 4,
  },
  {
    name: '親子空瑜',
    type: '兒童課程',
    date: '2023/09/08',
    start_time: '09:48',
    end_time: '10:45',
    teacherId: 4,
    current_rez: 4,
    total_rez: 4,
  },
  {
    name: '中階空瑜',
    type: '空中課程',
    date: '2023/09/08',
    start_time: '11:00',
    end_time: '12:00',
    teacherId: 4,
    current_rez: 0,
    total_rez: 4,
  },
  {
    name: '哈達瑜伽',
    type: '新開課程',
    date: '2023/09/08',
    start_time: '15:00',
    end_time: '16:00',
    teacherId: 3,
    current_rez: 3,
    total_rez: 4,
  }
]


// model Course {
//   id                 Int @id @default (autoincrement())
//   name               String
//   type String?
//   date               DateTime
//   start_time         String
//   end_time           String
//   teacher            User @relation(fields: [teacherId], references: [id])
//   teacherId          Int
//   reservations       Int @db.UnsignedSmallInt
//   total_reservations Int @db.UnsignedSmallInt
//   createdAt          DateTime @default (now())
//   updatedAt          DateTime @updatedAt

//   @@index([teacherId])
//   @@map("courses")
// }