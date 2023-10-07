import { compareSync } from "bcryptjs"
import prisma from "./initPrisma"

export default async function varifyEmail(email: string, hash: string): Promise<boolean> {
  const res = compareSync(`${email}_the-art-studio`, hash)
  const s = compareSync('happy1294123@gmail.com_the-art-studio', '$2a$10$sZalELxmPJSA3Xi8x8qVpu/aVvBYBSd09H8yE6VE9/eqAEKYK61e2')
  console.log(s)

  if (res) {
    const updateRes = await prisma.user.update({
      where: {
        email
      },
      data: {
        email_varified: true
      }
    })
    if (updateRes.id) {
      return true
    }
  }
  return false
}
