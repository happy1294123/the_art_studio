
export default function checkIsPass(dateString: string): boolean {
  const date = (new Date(dateString)).getTime()
  const now = (new Date()).getTime()
  return now >= date
}
