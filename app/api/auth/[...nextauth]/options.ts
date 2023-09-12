import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/initPrisma'
import bcrypt from 'bcryptjs'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as Record<string, string>

        try {
          const user = await prisma.user.findFirst({ where: { email } })
          if (!user) {
            return null
          }

          const pwdMatch = await bcrypt.compare(password, user.password)
          if (!pwdMatch) {
            return null
          }

          return user as any
        } catch (error) {
          console.log(error)
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === 'update') {
        // console.log(token, user, trigger, session)
        return {
          ...token,
          ...session
        }
      }
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          point: user.point,
          schedule_service: user.schedule_service
        }
      }
      return token
    },
    async session({ session, token }: any) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          point: token.point,
          schedule_service: token.schedule_service
        }
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  }
}