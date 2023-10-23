import { compareSync } from "bcryptjs"
import prisma from "./initPrisma"

export default async function varifyEmail(email: string, hash: string): Promise<boolean> {
  const res = compareSync(`${email}_the-art-studio`, hash)

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
