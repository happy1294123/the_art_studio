import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaulJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number,
      name: string,
      email: string,
      role: string,
      point: number,
      schedule_service: string
    } & DefaultSession
  }

  interface User extends DefaultSession {
    id: number,
    name: string,
    email: string,
    role: string,
    point: number,
    schedule_service: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaulJWT {
    id: number,
    name: string,
    email: string,
    role: string,
    point: number,
    schedule_service: string
  }
}