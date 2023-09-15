import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (request.nextUrl.pathname.startsWith('/manage')) {
      const role = request.nextauth.token?.role as string
      if (!['ADMIN', 'EDITOR'].includes(role)) {
        return NextResponse.rewrite(
          new URL('/user', request.url)
        )
      }
    }
  }, {
  callbacks: {
    authorized: ({ token }) => !!token
  }
}
)


// export { default } from 'next-auth/middleware' 
export const config = {
  matcher: ['/user', '/manage']
}