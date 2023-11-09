import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Salary } from "@/type"
import getColorByCourseType from '@/lib/course/getColorByCourseType'

type Props = {
  data: Salary
}

export default function SalaryCourseTable({ data }: Props) {
  console.log(data);
  return (<>
    <div className="flex flex-col">
      <span>
        薪資：$10000
      </span>
      <span>
        完成課程：10 堂
      </span>
      <span>
        排定課程：20 堂
      </span>
    </div>
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      {/* - 時間（月、上課、下課）
      - 課程名稱（課程種類）
      - 上課人數
      - 該課薪資（總計）
      - 鐘點費
      - 獎金 */}
      {/* {JSON.stringify(data.Course)} */}
      <TableHeader>
        <TableRow className="whitespace-nowrap text-center">
          <TableHead className="text-center">時間</TableHead>
          <TableHead className="text-center">名稱</TableHead>
          <TableHead className="text-center">人數</TableHead>
          {/* <TableHead className="text-center">鐘點費</TableHead>
          <TableHead className="text-center">獎金</TableHead> */}
          <TableHead className="text-center">小計</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.Course.map((course) => (
          <TableRow key={course.id} className="whitespace-nowrap text-center">
            <TableCell>
              <div className="flex-center flex-col">
                {course.date}
                <span>
                  {course.start_time}~{course.end_time}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex-center flex-col">
                {course.name}
                <span
                  className="rounded-full px-2"
                  style={{ background: getColorByCourseType(course.type) }}>
                  {course.type}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex-center flex-col">
                {course.Reservation.length} 人
                <span className="flex-center flex-col">
                  {course.Reservation?.map((r: any) => (
                    <span key={`${r.course_id}_${r.course_id}`}>{r?.user?.name}</span>
                  ))}
                </span>
              </div>
            </TableCell>
            {/* <TableCell>
              $1000
            </TableCell>
            <TableCell>
              $500
            </TableCell> */}
            <TableCell>
              <div className="flex-center flex-col">
                <span>
                  鐘點費 $1000
                </span>
                <span>
                  獎金 $500
                </span>
                <span>
                  總共 $1500
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>)
}
