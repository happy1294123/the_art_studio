export default function dateFormatter(date = new Date(), separator = '/', withZero = true) {
  const year = date.getFullYear()
  const month = withZero ? String(date.getMonth() + 1).padStart(2, '0') : date.getMonth() + 1
  const dateString = withZero ? String(date.getDate()).padStart(2, '0') : date.getDate()
  return `${year}${separator}${month}${separator}${dateString}`
}
