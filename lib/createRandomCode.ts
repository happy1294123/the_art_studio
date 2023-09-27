// 大寫、小寫、數字
const charsNums = [
  'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'i', 'j', 'k', 'l',
  'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x',
  'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]

export default function createRandomCode() {
  const codeAry = []
  for (let i = 1; i <= 8; i++) {
    codeAry.push(charsNums[Math.floor(Math.random() * 62)])
  }
  return codeAry.join('')
}
