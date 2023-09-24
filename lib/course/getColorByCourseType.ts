export default function getColorByCourseType(type: string | null): string {
  switch (type) {
    case '空中課程':
      return '#C7C8C2'
    case '地面課程':
      return '#D9CACA'
    case '兒童課程':
      return '#DCC1A7'
    case '新開課程':
      return '#F3E2BC'
    default:
      return '#000'
  }
}