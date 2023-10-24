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
    async jwt({ token, user, trigger, session }) {
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
          name: user.name,
          role: user.role,
          point: user.point,
          point_deadline: user.point_deadline,
          schedule_service: user.schedule_service,
          email_varified: user.email_varified
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          role: token.role,
          point: token.point,
          point_deadline: token.point_deadline,
          schedule_service: token.schedule_service,
          email_varified: token.email_varified
        }
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  }
}