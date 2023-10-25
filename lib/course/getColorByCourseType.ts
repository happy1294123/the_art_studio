

export default function getColorByCourseType(type: string | null): string {
  switch (type) {
    case '空中課程':
      return '#C7C8C2'
    case '地面課程':
      return '#D9CACA'
    case '兒童課程':
      return '#DCC1A7'
    default:
      return '#000'
  }
}