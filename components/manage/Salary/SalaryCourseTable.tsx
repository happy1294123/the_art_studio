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
import checkIsPass from "@/lib/checkIsPass"

type Props = {
  data: Salary
}

export default function SalaryCourseTable({ data }: Props) {
  const headingClassName = 'text-center text-headingColor'
  let passCourseNum = data.Course.filter(course => checkIsPass(`${course.date} ${course.end_time}`)).length

  return (<>
    {data.Course.length ? <>
      <div className="flex flex-col ml-auto mr-4 w-fit">
        <span className="flex">
          累積薪資：
          <span className="ml-auto">
            10000 元
          </span>
        </span>
        <span className="flex">
          完成課程：
          <span className="ml-auto">
            {passCourseNum} 堂
          </span>
        </span>
        <span className="flex">
          排定課程：
          <span className="ml-auto">
            {data.Course.length} 堂
          </span>
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
          <TableRow className="whitespace-nowrap border-headingColor">
            <TableHead className={headingClassName}>名稱</TableHead>
            <TableHead className={headingClassName}>時間</TableHead>
            <TableHead className={headingClassName}>人數</TableHead>
            {/* <TableHead className={headingClassName}>鐘點費</TableHead>
          <TableHead className={headingClassName}>獎金</TableHead> */}
            <TableHead className={headingClassName}>小計</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.Course.map((course) => {
            const isPass = checkIsPass(`${course.date} ${course.end_time}`)
            return (
              <TableRow key={course.id} className={`whitespace-nowrap border-headingColor ${!isPass && 'opacity-40'}`}>
                <TableCell >
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
                    {course.date}
                    <span>
                      {course.start_time}~{course.end_time}
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
            )
          })}
        </TableBody>
      </Table >
    </>
      : <span className="flex-center mt-4 mx-auto w-fit">無資料</span>}
  </>)
}
