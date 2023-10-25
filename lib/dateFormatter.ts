export default function dateFormatter(date = new Date(), separator = '/', withZero = true, withTime = false) {
  const year = date.getFullYear()
  const month = withZero ? String(date.getMonth() + 1).padStart(2, '0') : date.getMonth() + 1
  const dateString = withZero ? String(date.getDate()).padStart(2, '0') : date.getDate()
  if (withTime) {
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    return `${year}${separator}${month}${separator}${dateString} ${hour}:${min}:${sec}`
  }
  return `${year}${separator}${month}${separator}${dateString}`
}
