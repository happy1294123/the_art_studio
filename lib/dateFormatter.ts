export default function dateFormatter(date = new Date(), separator = '/', withZero = true, withTime = false) {
  const year = date.getFullYear()
  const month = withZero ? makeZero(date.getMonth() + 1) : date.getMonth() + 1
  const dateString = withZero ? makeZero(date.getDate()) : date.getDate()
  if (withTime) {
    const hour = withZero ? makeZero(date.getHours()) : date.getHours()
    const min = withZero ? makeZero(date.getMinutes()) : date.getMinutes()
    const sec = withZero ? makeZero(date.getSeconds()) : date.getSeconds()
    return `${year}${separator}${month}${separator}${dateString} ${hour}:${min}:${sec}`
  }
  return `${year}${separator}${month}${separator}${dateString}`
}

const makeZero = (num: number) => {
  return String(num).padStart(2, '0')
}
