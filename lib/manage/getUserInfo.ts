import dateFormatter from "@/lib/dateFormatter"
import { User } from "@prisma/client"

const fieldMap = {
  serial_number: '編號',
  name: '姓名',
  email: '電子郵件',
  point: '點數',
  point_deadline: '點數期限',
  schedule_service: '行事曆',
  email_varified: '信箱驗證',
  role: '身份',
  note: '備註'
}

const fieldDetailMap = {
  gender: '性別',
  birth: '生日',
  phone: '手機',
  address: '地址',
  medical: '病史',
}

const emFieldDetailMap = {
  em_name: '姓名',
  em_relation: '關係',
  em_phone: '手機'
}

export default function getUserInfo(user: User) {
  const userInfo = []
  const userDetail = []
  const userEmDetail = []
  for (let key in user) {
    let value = user[key as keyof typeof user] || '-'
    if (key in fieldMap) {
      const field = fieldMap[key as keyof typeof fieldMap]
      if (key === 'point') {
        value = `${String(value === '-' ? 0 : value)} 點`
      }
      if (key === 'point_deadline' && value !== '-') {
        value = dateFormatter(new Date(value as string))
      }
      if (key === 'email_varified') {
        value = value ? '成功' : '尚未'
      }
      if (key === 'role') {
        value = value === 'STUDENT' ? '學生' : '老師'
      }
      if (key === 'note' && !value) {
        value = ''
      }
      userInfo.push({ field, value })
    } else if (key in fieldDetailMap) {
      const detailField = fieldDetailMap[key as keyof typeof fieldDetailMap]
      if (detailField) {
        if (key === 'gender') {
          value = value === 'MALE' ? '男性' : value === 'FEMALE' ? '女性' : '-'
        }
        userDetail.push({ field: detailField, value })
      }
    } else {
      const detailField = emFieldDetailMap[key as keyof typeof emFieldDetailMap]
      if (detailField) {
        userEmDetail.push({ field: detailField, value })
      }
    }
  }
  const medical = userDetail.splice(3, 1)
  userDetail.push(medical[0])
  return { userInfo, userDetail, userEmDetail }
}
