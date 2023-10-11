import { hashSync } from "bcryptjs";
import prisma from "./initPrisma";

export default async function resetPwd(email: string) {
  const password = hashSync('12345678', 10)
  const res = await prisma.user.update({
    where: {
      email
    },
    data: {
      password
    }
  })
  return res
}