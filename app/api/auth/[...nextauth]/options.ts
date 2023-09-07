import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as Record<string, string>

        try {
          const prisma = new PrismaClient()
          const user = await prisma.user.findFirst({ where: { email } })
          if (!user) {
            return null
          }

          const pwdMatch = await bcrypt.compare(password, user.password)
          if (!pwdMatch) {
            return null
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            email_varified: user.email_varified
          } as any
        } catch (error) {
          console.log(error)

        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  }
}